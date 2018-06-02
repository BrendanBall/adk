import express from 'express'
import cors from 'cors'
import { graphqlExpress } from 'apollo-server-express'
import morgan from 'morgan'
import schema from './graphql'
import { createLoaders } from './graphql/resolvers'
import Knex from 'knex'
import knexConfig from '../knexfile'
import { Model } from 'objection'
const expressPlayground = require('graphql-playground-middleware-express').default

const knex = Knex(knexConfig.development)
Model.knex(knex)

const app = express()
app.use(morgan('combined'))
app.use(cors())

app.get('/graphql/playground', expressPlayground({ endpoint: 'graphql' }), (req, res) => { })
app.use('/graphql', express.json(), graphqlExpress(req => ({ schema: schema(), context: { loaders: createLoaders() } })))

app.listen(3001, () => console.log('running graphql server on port 3001'))
