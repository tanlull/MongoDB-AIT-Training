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

// DELETE 
db.products.deleteMany(
    { "isOutofStock": true }
);

// Aggregate
db.sales.aggregate(
    [
        { $match: { "totalPrice": { $exists: true } } },
        { $group: { "_id": "$customer.gender", "totalSales": { $sum: "$totalPrice" } } }

    ]
)

// No Count Function then create by our own
db.sales.aggregate(
    [
        { $match: { "totalPrice": { $exists: true } } },
        { $group: { "_id": "$customer.gender", "noOfSales": { $sum: 1 } } }

    ]
)

// Show sum of totalPrice grouped by customerRating own
db.sales.aggregate(
    [
        { $match: { "totalPrice": { $exists: true } } },
        { $group: { "_id": "$customer.customerRating", "totalSales": { $sum: "$totalPrice" } } }

    ]
)

//how many cusotmer who used and did not use coupon in sales data

db.sales.aggregate(
    [
        { $match: { "couponUsed": false } },
        { $group: { "_id": "$couponUsed", "noCouponUsed": { $sum: 1 } } }

    ]
)

// Count -- group by couponUsed
db.sales.aggregate(
    [
        { $group: { "_id": "$couponUsed", "CouponUsed": { $sum: 1 } } }

    ]
)

// Group by store location and couponused
db.sales.aggregate(
    [
        {
            $group: {
                "_id": ["$storeLocation", "$couponUsed"],
                "CouponUsed": { $sum: 1 }
            }
        },
    ]
)


// group 2 column , and sort
db.sales.aggregate(
    [
        {
            $group: {
                "_id": { "location": "$storeLocation", "coupon": "$couponUsed" },
                "CouponUsed": { $sum: 1 }
            }
        },
        { $sort: { "_id.location": 1, "CouponUsed": -1 } }
    ]
)

// limit number of display
db.sales.aggregate(
    [
        {
            $group: {
                "_id": { "location": "$storeLocation", "coupon": "$couponUsed" },
                "CouponUsed": { $sum: 1 }
            }
        },
        { $sort: { "CouponUsed": -1, "_id.location": 1 } },
        { $limit: 3 }
    ]
)

// Unwind --> expand array object to eact json doc
db.sales.aggregate([
    { $unwind: { path: "$items" } },
    { $sort: { "_id": -1 } },
]);


//select top 3 products by total qty
db.sales.aggregate([
    { $unwind: { path: "$items" } },
    { $group: { "_id": "$items.name", "qty": { $sum: "$items.quantity" } } },
    { $sort: { "qty": -1 } },
    { $limit: 3 }
]);

// Group and source
db.sales.aggregate([
    {
        $group: {
            "_id": { $month: "$saleDate" },
            "NoOfSales": { $sum: 1 },
            "TotalSales": { $sum: "$totalPrice" },
            "AvgSales": { $avg: "$totalPrice" }
        }
    },
    { $sort: { "_id": 1 } },
]);