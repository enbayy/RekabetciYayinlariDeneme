// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function connectToDatabase() {
  if (!client.isConnected?.()) await client.connect(); // eski sürümlerde isConnected yoksa hata vermez
  const db = client.db(process.env.MONGODB_DB); // burayı ekledik
  return { db, client };
}
