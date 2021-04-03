//All commands
//1. Switch database
use DSAIdb;

//2. Simple Query 
//db.<collection-name>.find();
db.customers.find();

//3. Query with criteria (like WHERE clause)
//db.<collection-name>.find( { "prop1" : "val1" [, "prop2" : "val2"] });
db.customers.find({ "name": "John", "age": 50 });

//4. Projection (selecting some properties/field)
//inclusive -- showing
db.customers.find({}, { "name": 1, "age": 1 });
//exclusive -- not showing
db.customers.find({}, { "name": 0, "age": 0 });

//5. Operators $gt, $gte, $lt, $lte, $eq, $ne, etc...
db.customers.find({ "age": { $gte: 60 } });

//6. Finding in array ($in)
db.products.find({ "tags": { $in: ['tagA', 'tagB', 'tagC'] } });

//7. Regular Expression ($regex)
db.products.find({ "name": { $regex: /chocolate/ } });

//Your turn
//Complete the following queries
//Q1. Showing all products having price greater than 500, quantity lower than 50 and tagged by the word  kids

db.products.find({
    "price": { $gt: 500 },
    "quantity": { $lt: 50 },
    "tag": { $in: ["kids"] }
});


//Q2. Modify Q1 to exclude desctiption property

db.products.find(
    {
        "price": { $gt: 500 },
        "quantity": { $lt: 50 },
        "tag": { $in: ["kids"] }
    },
    {
        "desctiption": 0
    }
);

/// TEst

db.products.find(
    {
        "price": { $gt: 500 },
    }
);


db.products.find(
    {
        "price": { $gt: 500 },
    },
    {
        "name": 0
    }
);


db.products.find(
    {
        "size": { $exists: true }
    }
);
// Insert Many 

db.products.insertMany([
    {
        "name": "สบู่",
        "description": "Soap Soap Soap Soap ",
        "price": 10,
        "tag": ["a", "b"],
        "addBy": "Tanya"
    },
    {
        "name": "สบู่2",
        "description": "Soap Soap Soap Soap 222",
        "price": 10,
        "tag": ["a", "b"],
        "addBy": "Tanya"
    },
    {
        "name": "สบู่2",
        "description": "Soap Soap Soap Soap 333",
        "price": 10,
        "tag": ["a", "b"],
        "addBy": "Tanya"
    },
]);

{
    '0': ObjectId("6067e9fc72b04b5bb48e2365"),
        '1': ObjectId("6067e9fc72b04b5bb48e2366"),
            '2': ObjectId("6067e9fc72b04b5bb48e2367")
}

db.products.find({
    "_id": {
        $in: [
            ObjectId("6067e9fc72b04b5bb48e2365"),
            ObjectId("6067e9fc72b04b5bb48e2366"),
            ObjectId("6067e9fc72b04b5bb48e2367")
        ]
    }
});

db.products.find(
    { "addBy": "Tanya" },
);

// Update many

db.products.updateMany(
    { "_id": ObjectId("6067e9fc72b04b5bb48e2365") },
    { $set: { "isBestSeller": true } }
);

// update 
db.products.updateMany(
    { "addBy": "Tanya" },
    { $set: { "isOutofStock": true } }
);

// check update
db.products.find(
    { "addBy": "Tanya" },
);

// Remove field
db.products.updateMany(
    { "_id": ObjectId("6067e9fc72b04b5bb48e2365") },
    { $unset: { "isBestSeller": true } }
);