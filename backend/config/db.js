import { MongoClient } from "mongodb";
import dontenv from "dotenv";

dontenv.config();

// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = await client.connect();
conn.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
export default conn;
