const mongodb = require("mongodb");
//require("dotenv").config();
const MongoClient = mongodb.MongoClient;
function MongoUtils() {
  const mu = {};

  //const ObjectId = mongodb.ObjectID;
  const posting = process.env.DB_NAME || "Error Database";
  let url = process.env.DB_URL || "mongodb://localhost:27017";

  // To change url server
  mu.url = (paramUrl) => {
    url = process.env.DB_URL || "mongodb://localhost:27017";
    if (paramUrl !== "") url = paramUrl;
  };

  // Connect to the DB
  mu.connect = () => {
    const options = { useUnifiedTopology: true, useNewUrlParser: true };
    const client = new MongoClient(url, options);
    return client.connect();
  };

  mu.test = {};

  mu.test.getPages = () => {
    return mu.connect().then((client) => {
      const test = client.db(posting).collection("test");
      return test.estimatedDocumentCount().finally(() => client.close());
    });
  };

  mu.test.findAll = (pageNumber, nPerPage) => {
    if (!pageNumber) pageNumber = 1;
    if (!nPerPage) nPerPage = 9;
    return mu.connect().then((client) => {
      const test = client.db(posting).collection("test");
      const query = {};

      return test
        .find(query)
        .sort({ _id: -1 })
        .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
        .limit(nPerPage)
        .toArray()
        .finally(() => client.close());
    });
  };

  return mu;
}

module.exports = MongoUtils();
