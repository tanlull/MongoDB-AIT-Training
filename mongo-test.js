const { MongoClient } = require("mongodb");
// Connection URI
const uri =
    "mongodb+srv://user1:user1@mall101cluster0.aaqg2.mongodb.net/DSAIdb?authSource=admin&replicaSet=atlas-gkctk2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);