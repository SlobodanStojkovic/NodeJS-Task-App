//CRUD - create read update delete operations

const { mongodb, MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

//to access ObjectId and its properties
/* const id = new ObjectId(); 
console.log(id);
console.log(id.getTimestamp());
console.log(id.toHexString()); */

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
        _id: id, //optional, if we want to set up id, but its extra code, because mongodb auto generates it
        name: "Vikram",
        age: 35,
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

    //to find a single entry, can be name or ObjectId or any other property
    /* db.collection("users").findOne(
      { _id: new ObjectId("627f7937f71e74f67a6cf4c0") },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(user);
      }
    ); */

    //search for multiple users
    /* db.collection("users")
      .find({ age: 27 })
      .toArray((error, users) => {
        console.log(users);
      }); */

    //UPDATE ENTRY, change name on item with this ObjectId
    /* db.collection("users")
      .updateOne(
        {
          _id: new ObjectId("627f838ad51708c7ed6ff5e2"),
        },
        {
          //https://www.mongodb.com/docs/manual/reference/operator/update/ Mongodb update operators
          $set: {
            name: "John",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //INCREMENT age by 1
    db.collection("users")
      .updateOne(
        {
          _id: new ObjectId("627f838ad51708c7ed6ff5e2"),
        },
        {
          //https://www.mongodb.com/docs/manual/reference/operator/update/ Mongodb update operators
          $inc: {
            age: 1,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //UPDATE MANY items
    db.collection("tasks")
      .updateMany(
        {
          completed: true,
        },
        {
          $set: {
            completed: false,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      }); */

    //DELETE multiple items with same criteria > age: 37 in this case
    db.collection("users")
      .deleteMany({
        age: 37,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //DELETE single item
    db.collection("tasks")
      .deleteOne({
        description: "Buy food",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
