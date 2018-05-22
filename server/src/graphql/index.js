import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import rootResolver from './resolvers'

export default function schema () {
  return makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: rootResolver()
  })
}
