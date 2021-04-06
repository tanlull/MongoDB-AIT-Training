const dotenv = require("dotenv")
dotenv.config()
const mongodb = require("mongodb")

mongodb.connect(process.env.CONNECTIONSTRING, { useUnifiedTopology: true }, async function (err, client) {
    const db = client.db()
    //const result = await db.collection("products").find({ "tags": "pen" }).toArray()

    const products = db.collection("products")
    // insert 

    await products.insertOne({
        "name": "สบู่",
        "description": "Soap Soap Soap Soap ",
        "price": 10,
        "tag": ["a", "b"],
        "addBy": "Tanya1"
    })

    console.log("Add a New Product")
    // Select  
    result = await products.find({ addBy: "Tanya1" }).toArray()
    console.log(result)

    //Update
    await products.updateOne({ _id: mongodb.ObjectId("606c222eebc5305a4cf64319") }, { $set: { addBy: "Tanya3" } })

    console.log("Updated!!")


    // Select  
    result = await products.find({ _id: mongodb.ObjectId("606c222eebc5305a4cf64319") }).toArray()
    console.log(result)


    // Delete
    await products.deleteOne({ _id: mongodb.ObjectId("606c222eebc5305a4cf64319") })
    console.log("Deleted!!")

    client.close()
})