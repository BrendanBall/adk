import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import rootResolver from './resolvers'

export default function schema () {
  let schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: rootResolver()
  })
  return schema
}
