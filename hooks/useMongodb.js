import { MongoClient } from 'mongodb';

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient = null;
let cachedDb = null;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export async function buildQuery(db, collection, params, searchColumns) {
  let filters = {};
  const limit = 10;
  const page = params.page ?? 1;
  const skip = (page - 1) * limit;
  let sort = { _id: 1 };

  if (params.sort) {
    const sortDir = params.asc === 'true' ? 1 : -1;
    sort = {
      [params.sort]: sortDir,
    };
  }
  if (params.search) {
    filters = {
      $or: searchColumns.map((column) => {
        return { [column]: { $regex: params.search, $options: 'i' } };
      }),
    };
  }
  const results = await db.collection(collection).find(filters, { projection: {} }).sort(sort).skip(skip).limit(limit).toArray();
  const count = await db.collection(collection).countDocuments();
  const start = skip + 1;
  const end = start + results.length > count ? count : start + results.length - 1;
  const showing = `showing ${start}-${end} of ${count}`;
  console.log({ params, sort, count, page, showing });
  return { results, count, page, showing };
}
