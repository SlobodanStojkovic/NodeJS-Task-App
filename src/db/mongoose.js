require("dotenv").config();
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: __dirname + "../../test.env" });
}

const getMongodbUrl = () => {
  if (process.env.NODE_ENV === "test") {
    return process.env.MONGODB_URL_TEST;
  } else return process.env.MONGODB_URL;
};

const mongodb_url = getMongodbUrl();

mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
});
