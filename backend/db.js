const { ContextHandlerImpl } = require('express-validator/src/chain');
const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
// const mongoURI ="mongodb://0.0.0.0:27017/";
const mongoURI = process.env.MONGO_URI
// mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports = async function (callback) {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected to MongoDB');

    const foodCollection = mongoose.connection.db.collection('food_items');
    const data = await foodCollection.find({}).toArray();

    const categoryCollection = mongoose.connection.db.collection('foodCategory');
    const Catdata = await categoryCollection.find({}).toArray();
    global.food_items=data;
    global.foodCategory=Catdata;

    callback(null, data, Catdata);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    callback(err);
  }
};