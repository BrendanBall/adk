import express from 'express'
import { graphqlExpress } from 'apollo-server-express'
import morgan from 'morgan'
import schema from './graphql'
const expressPlayground = require('graphql-playground-middleware-express').default

const app = express()
app.use(morgan('combined'))

app.get('/graphql/playground', expressPlayground({ endpoint: 'graphql' }), (req, res) => { })
app.use('/graphql', express.json(), graphqlExpress(req => ({ schema: schema() })))

app.listen(3000, () => console.log('running graphql server on port 3000'))