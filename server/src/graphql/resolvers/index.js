import Task from '../../models/task'
import User from '../../models/user'
import DataLoader from 'dataloader'

export default function rootResolver () {
  return {
    Query: {
      tasks: async (obj, args, {loaders: { users }}, info) => {
        return Task.query()
      }
    },
    Mutation: {
      createTask: async (obj, { input }, {loaders: { users }}, info) => {
        return Task.query().insert(input)
      }
    },
    Task: {
      createdBy: async ({ createdByUserId }, args, {loaders: { users }}, info) => {
        return users.load(createdByUserId)
      }
    }
  }
}

async function userResolver (userIds) {
  return User.query().whereIn('id', userIds)
}

export function createLoaders () {
  return {
    users: new DataLoader(ids => userResolver(ids))
  }
}
