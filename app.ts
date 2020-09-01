const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DBCOnnection = require('./src/config/connection');
const { ApolloServer } = require('apollo-server-express');
const { schema } = require('./src/graphqlSchema');
const utils = require('./src/util/getCurrentDB');
const axios = require("axios")

const server = new ApolloServer({
  debug: process.env.NODE_ENV === "development",
  schema,
  introspection: true,
  playground: {
    settings: {
      'editor.theme': 'light',
    }
  },
  context: async ({ req }) => {
    const context = {db: ""};
    const db = await utils.getDbFromHostName('localhost');
    context.db = db;
    return context;
  }
});
server.applyMiddleware({ app });
axios({
  url: 'http://localhost:5000/graphql',
  method: 'post',
  data: {
    query: `
      query{
          books{
          title
        }
      } 
      `
  }
}).then((result) => {
  console.log(result.data.data.books)
});
app.listen(process.env.PORT, async () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
