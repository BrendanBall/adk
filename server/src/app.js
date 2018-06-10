import express from 'express'
import cors from 'cors'
import { graphqlExpress } from 'apollo-server-express'
import morgan from 'morgan'
import createSchema from './graphql'
import { createLoaders } from './graphql/resolvers'
import Knex from 'knex'
import knexConfig from '../knexfile'
import { Model } from 'objection'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import Nats from 'nats'
import { NatsPubSub } from 'graphql-nats-subscriptions'
import bunyan from 'bunyan'
const expressPlayground = require('graphql-playground-middleware-express').default

const knex = Knex(knexConfig.development)
Model.knex(knex)

var logger = bunyan.createLogger({name: 'adk'})

var nats = Nats.connect({url: 'nats://192.168.39.47:30989'})
const pubsub = new NatsPubSub({client: nats, logger})

const schema = createSchema(nats, pubsub)

const PORT = 3001

const app = express()
app.use(morgan('combined'))
app.use(cors())

app.get('/graphql/playground', expressPlayground(
  {
    endpoint: 'graphql',
    subscriptionEndpoint: `ws://localhost:${PORT}/subscriptions`
  }), (req, res) => { })
app.use('/graphql', express.json(), graphqlExpress(req => ({ debug: true, schema, context: { loaders: createLoaders(true) } })))

function onOperation (message, params, webSocket) {
  console.log('onOperation params: ', params)
  return { ...params, context: { loaders: createLoaders(false) } }
}

const ws = createServer(app)
ws.listen(PORT, () => {
  console.log(`Apollo Server is now running on http://localhost:${PORT}`)
  // Set up the WebSocket for handling GraphQL subscriptions
  return new SubscriptionServer({ execute, subscribe, schema, onOperation }, { server: ws, path: '/subscriptions' })
})
