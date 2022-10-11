const dotenv = require('dotenv').config()
const colors = require('colors')
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

//GraphQl
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected'.cyan.underline)
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`.blue.underline)
  })