const { MongoClient } = require("mongodb");

const mongo = () => {
  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  return client;
};

module.exports = {
  getData: async (databaseName, collection, query) => {
    console.log(query);
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);
    const data = await collections.find(query).toArray();
    client.close();
    return data;
  },

  insertData: async (databaseName, collection, insertingOBJ) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);
    try {
      await collections.insertOne(insertingOBJ);
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  },

  addComment: async (comments) => {
    const client = mongo();
    await client.connect();
    var ObjectId = require("mongodb").ObjectId;
    var id = comments[0];
    var o_id = new ObjectId(id);

    console.log(comments);

    const query = { _id: o_id };
    const update = {
      $push: {
        commentList: {
          firstName: comments[1],
          lastName: comments[2],
          comment: comments[3],
        },
      },
    };
    client.close();
  },

  deleteData: async (databaseName, collection, queryToDelete) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);

    try {
      await collections.deleteOne(queryToDelete);
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  },
};
