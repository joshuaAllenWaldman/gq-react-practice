const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql')
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql')
const expressPlayground = require('graphql-playground-middleware-express')
  .default

//
app.use(bodyParser.json());

app.get('/playground', expressPlayground({ endpoint: '/graphql'}))
app.use(
  '/graphql', 
  graphqlHTTP({
    schema: buildSchema(`
      type RootQuery {
        hello: String!
      }

      type RootMutation {
        someMutation: String!
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      hello:() => {
        return 'hello doggy'
      }
    },
    graphiql: true
  })
  )



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> {
  console.log('Server is Running')
})