const dotenv = require('dotenv').config()
const colors = require('colors')
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const connectDB = require('./utils/db.js')

//GraphQl
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

async function startServer() {
  await connectDB()

  const app = express()
  const server = new ApolloServer({
    uri: 'https://localhost:5000',
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  })
  await server.start()

  const corsOptions = {
    origin: true,
    credentials: true,
  }

  app.use(cors(corsOptions))

  if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'))
    })
  } else {
    app.get('/', (req, res) => {
      res.send('API is running')
    })
  }

  server.applyMiddleware({ app, path: '/', cors: false })

  const PORT = process.env.PORT || 5000
  app.listen(PORT, console.log(`Server started on port ${PORT}`))
}

startServer()
