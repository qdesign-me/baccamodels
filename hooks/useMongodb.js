import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

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
  let search = {};
  const limit = 10;
  const page = params.page ?? 1;
  const skip = (page - 1) * limit;
  let sort = { _id: 1 };
  const filters = {};
  if (params.filters) {
    Object.keys(params.filters).map((f) => {
      filters[f] = params.filters[f];
    });
  }

  if (params.sort) {
    const sortDir = params.asc === 'true' ? 1 : -1;
    sort = {
      [params.sort]: sortDir,
    };
  }
  if (params.search) {
    search = {
      $or: searchColumns.map((column) => {
        return { [column]: { $regex: params.search, $options: 'i' } };
      }),
    };
  }

  const find = { $and: [filters, search] };

  const results = await db.collection(collection).find(find, { projection: {} }).sort(sort).skip(skip).limit(limit).toArray();
  const count = (await db.collection(collection).find(find).toArray()).length;
  const start = skip + 1;
  const end = start + results.length > count ? count : start + results.length - 1;
  const showing = `showing ${start}-${end} of ${count}`;

  return { results, count, page, showing };
}
/*
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

const DataBase = function () {};

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

export async function connectToDatabase() {
  console.log('CONNECT', DataBase.client);
  if (DataBase.db) {
    return { client: DataBase.client, db: DataBase.db };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  DataBase.client = client;
  DataBase.db = db;
  return DataBase;
}

export async function buildQuery(db, collection, params, searchColumns) {
  let search = {};
  const limit = 10;
  const page = params.page ?? 1;
  const skip = (page - 1) * limit;
  let sort = { _id: 1 };
  const filters = {};
  if (params.filters) {
    Object.keys(params.filters).map((f) => {
      filters[f] = params.filters[f];
    });
  }

  if (params.sort) {
    const sortDir = params.asc === 'true' ? 1 : -1;
    sort = {
      [params.sort]: sortDir,
    };
  }
  if (params.search) {
    search = {
      $or: searchColumns.map((column) => {
        return { [column]: { $regex: params.search, $options: 'i' } };
      }),
    };
  }

  const find = { $and: [filters, search] };

  const results = await db.collection(collection).find(find, { projection: {} }).sort(sort).skip(skip).limit(limit).toArray();
  const count = (await db.collection(collection).find(find).toArray()).length;
  const start = skip + 1;
  const end = start + results.length > count ? count : start + results.length - 1;
  const showing = `showing ${start}-${end} of ${count}`;

  return { results, count, page, showing };
}
*/
