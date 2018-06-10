import Task from '../../models/task'
import User from '../../models/user'
import DataLoader from 'dataloader'

const TASK_CREATED_TOPIC = 'task_created'

export default function rootResolver (nats, pubsub) {
  return {
    Query: {
      tasks: async (obj, args, {loaders: { users }}, info) => {
        return Task.query()
      }
    },
    Mutation: {
      createTask: async (obj, { input }, { loaders: { users } }, info) => {
        let task = await Task.query().insert(input)
        pubsub.publish(TASK_CREATED_TOPIC, task)
        return task
      },
      updateUser: async (obj, { id, input }, ctx, info) => {
        return User.query().patchAndFetchById(id, input)
      }
    },
    Subscription: {
      taskCreated: {
        resolve: (task, args, context, info) => {
          return task
        },
        subscribe: () => {
          console.log('subscribing')
          return pubsub.asyncIterator(TASK_CREATED_TOPIC)
        }
      }
    },
    Task: {
      createdBy: async (task, args, { loaders: { users } }, info) => {
        return users.load(task.createdByUserId)
      }
    }
  }
}

async function userResolver (userIds) {
  return User.query().whereIn('id', userIds)
}

export function createLoaders (enableCache) {
  return {
    users: new DataLoader(ids => userResolver(ids), {cache: enableCache})
  }
}
