const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'vladislavskiDB';

let db;
let itemsCollection;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    itemsCollection = db.collection('items');
    console.log('Connected to MongoDB');
  }
  return itemsCollection;
}

// בודק אם פריט עם itemId קיים
async function checkItemExists(itemId) {
  const collection = await connect();
  const item = await collection.findOne({ itemId });
  return item !== null;
}

// שומר פריט חדש
async function saveItem(itemData) {
  const collection = await connect();
  const result = await collection.insertOne(itemData);
  return result.insertedId;
}

module.exports = {
  connect,
  checkItemExists,
  saveItem,
};
