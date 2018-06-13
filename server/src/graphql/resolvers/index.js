import Task from '../../models/task'
import User from '../../models/user'
import DataLoader from 'dataloader'
import { PubSub } from 'graphql-subscriptions'

export const pubsub = new PubSub()

const TASK_CREATED_TOPIC = 'task_created'

export default function rootResolver () {
  return {
    Query: {
      tasks: async (obj, args, { knex }, info) => {
        return Task.query(knex)
      }
    },
    Mutation: {
      createTask: async (obj, { input }, ctx, info) => {
        let task = await Task.query().insert(input)
        pubsub.publish(TASK_CREATED_TOPIC, task)
        return task
      },
      updateUser: async (obj, { id, input }, { knex }, info) => {
        return User.query(knex).patchAndFetchById(id, input)
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

async function userResolver (knex, userIds) {
  return User.query(knex).whereIn('id', userIds)
}

export function createLoaders (knex, enableCache) {
  return {
    users: new DataLoader(ids => userResolver(knex, ids), {cache: enableCache})
  }
}
