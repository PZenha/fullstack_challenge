const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());

app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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
  rootValue: {
    events: () => {
     return Event.find()
      .then(events => {
        return events.map(event => {
          return { ...event._doc };
        })
      })
      .catch(err => {
        throw err;
      });
    },
    createEvent: (args) => {
      const event = new Event({
        name: args.eventInput.name,
        surname: args.eventInput.surname,
        country: args.eventInput.country,
        birthday: args.eventInput.birthday
      });
      return event.save().then(result => {
              console.log(result);
              return {...result._doc};
              }).catch(err => {
                console.log(err);
                throw err;
      });
    }
  },
  graphiql: true
}));

app.get('/countries',(req,res) => {
  let countries = ["Portugal", "Germany", "Spain"];
  res.json({countries: countries});
})

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  app.listen(4000,function(){
    console.log('Listen on port 4000');
  }
  );
})
.catch(err => {
  console.log(err);
});

