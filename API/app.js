const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());

//CORS POLICY
//Setting the right headers to allow cross origin requests
app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

//GRAPHQL SCHEMA
app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      name: String!
      surname: String!
      country: String!
      birthday: String!
    }

    input EventInput {
      name: String!
      surname: String!
      country: String!
      birthday: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: { //Point at javascript objects with all resolver functions
    events: () => {   //Query Resolver
     return Event.find() //Query to search on DB even though we're not making any query on our App
      .then(events => {
        return events.map(event => { //Return the result
          return { ...event._doc };
        })
      })
      .catch(err => { //Catch error
        throw err;
      });
    },
    createEvent: (args) => {   //Mutation Resolver
      const event = new Event({
        name: args.eventInput.name,
        surname: args.eventInput.surname,
        country: args.eventInput.country,
        birthday: args.eventInput.birthday
      });
      return event.save().then(result => { //Result from DB
              console.log(result);
              return {...result._doc}; //._doc leaves all the metadata that we dont "need"
              }).catch(err => { //Catch error
                console.log(err);
                throw err;
      });
    }
  },
  graphiql: true  //Graphql UI
}));

//Response to our React App with a JSON response with 3 countries
app.get('/countries',(req,res) => {
  let countries = ["Portugal", "Germany", "Spain"];
  res.json({countries: countries});
})

//Connection to our DataBase and allow our API to listen in case of sucess
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  app.listen(4000,function(){
    console.log('Listen on port 4000');
  }
  );
})
.catch(err => {
  console.log(err);
});

