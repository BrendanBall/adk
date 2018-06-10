import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import rootResolver from './resolvers'

export default function schema (nats, pubsub) {
  let schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: rootResolver(nats, pubsub)
  })
  return schema
}
