//CRUD - create read update delete operations

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    //we inserted our first document
    /* db.collection("users").insertOne(
      {
        name: "Slobodan",
        age: "30",
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert user");
        }

        console.log(result);
      }
    ); */

    //create multiple documents
    /* db.collection("tasks").insertMany(
      [
        { description: "Learn course", completed: true },
        { description: "Pay bills", completed: true },
        { description: "Buy food", completed: false },
      ],
      (error, result) => {
        if (error) {
          return console.log(error);
        }

        console.log(result);
      }
    ); */

    
  }
);
