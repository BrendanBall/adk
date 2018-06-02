import Task from '../../models/task'
import User from '../../models/user'
import DataLoader from 'dataloader'

export default function rootResolver () {
  return {
    Query: {
      tasks: async (obj, args, {loaders: { users }}, info) => {
        let results = await Task.query()
        return results.map(t => ({...t, createdBy: users.load(t.createdByUserId)}))
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
