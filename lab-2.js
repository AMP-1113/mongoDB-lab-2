// 1. Average age
db.people.aggregate([
    { $group: {
        _id: null,
        averageAge: {$avg: "$age"}
    } },
    {$project: {_id: false}}
])

// 2. Average age by gender  Expected Result: Female: 42.04, Male: 40.60
db.people.aggregate([
    {$group : {
        _id: "$gender",
        averageAge: {$avg: "$age"}
    }},
    {$project: {
        gender: "$_id",
        averageAge: true,
        _id: false
    }}
])

// 3. Number of people by gender    Expected Result: Female: 113, Male: 87
db.people.aggregate([
    {$group : {
        _id: "$gender",
        count: {$sum: 1}
    }},
    {$project: {
        gender: "$_id",
        count: true,
        _id: false
    }}
])

// 4. 3 oldest people  Expected Result: Phyllis Gray 81, Melissa Banks 79, Walter Bishop 76
db.people.aggregate([
    { $sort: {age: -1} },
    { $limit: 3 },
    {$project: {
        first_name: true,
        last_name: true,
        age: true,
        _id: false
    }}
])

// 5. 5 youngest people, display only their names as one value (first + " " + last) and their ages
db.people.aggregate([
    { $sort: {age: 1} },
    { $limit:  5},
    {$project: {
        first_name: true,
        last_name: true,
        age: true,
        _id: false
    }}
])

// 6. Average number of children
db.people.aggregate([
    { $group: {
        _id: null,
        avgNumChildren: { $avg: {$size: "$children"} }
    } },
    {$project: {
        _id: false
    }}
])

// 7. Name and age of children in Michigan who are under age ten  Expected Result: Adam 0, Janice 1, Judith 3, Beverly 4, Antonio 6, Jeremy 7
db.people.aggregate([
    { $match: { state: "Michigan" } },
    { $unwind: "$children" },
    { $match: { "children.age": { $lt: 10} } },
    { $project: {
        _id: false,
        "children.name": true,
        "children.age": true
    }},
])

// 8. Average age of child by state, sorted with oldest first
db.people.aggregate([
    { $unwind: "$children" },
    { $group: {
        _id: "$state",
        ageTotal: { $sum: "$children.age" },
        totalChildren: {$sum: 1}
    }},
    { $project: {
        _id: false,
        averageAge: { $divide: [ "$ageTotal", "$totalChildren" ] },
        state: "$_id"
    } }
])

// 9. Find the total dollar amount of all sales ever. Use the total field.  Expected Result: 680.92
db.orders.aggregate([
    {$group : {
        _id: null,
        total: {$sum: "$total"}
    }},
    {$project: {
        _id: false
    }}
])

// 10. Find the total dollar amount of sales on 2017-05-22. Use the total field.
db.orders.aggregate([
    {$match: {date: "2017-05-22"}},
    {$group : {
        _id: null,
        total: {$sum: "$total"}
    }},
    {$project: {
        _id: false
    }}
])

// 11. Find the date with the greatest number of orders. Include the date and the number of
db.orders.aggregate([
    {$group: {
        _id: "$date",
        orders: { $sum: 1 }
    }},
    {$sort: { orders: -1}},
    {$limit: 1},
    {$project: {
        date: "$_id",
        _id: false,
        orders: true
    }}
])

// 12. Find the date with the greatest total sales. Include the date and the dollar amount for that day.
    db.orders.aggregate([
        { $group: {
            _id: "$date",
            totalSales: { $sum: "$total" }
        } },
        {$sort: { totalSales: -1}},
        {$limit: 1}
    ])

// 13. Find the top three products that have had the greatest number sold. Include product name and number sold.
db.orders.aggregate([
    {$unwind: "$items"},
    {$group: {
        _id: "$items.product",
        numSold: {$sum: "$items.count"}
    }},
    {$sort: {numSold: -1}},
    {$limit: 3},
    {$project: {
        _id: false,
        Name: "$_id",
        Quantity: "$numSold"
    }}
])

// 14. Find the top item that has the greatest revenue (number sold * price). Include product name and dollar amount of sales.
// Expected Result: Shoes 197.98
db.orders.aggregate([
    {$unwind: "$items"},
    {$group: {
        _id: "$items.product",
        numSold: {$sum: "$items.count"},
        price: {$max: "$items.price"}
    }},
    {$project: {
        _id: false,
        name: "$_id",
        Total: {$multiply: ["$numSold", "$price"]}
    }},
    {$sort: {Total: -1}},
    {$limit: 1}
])

{ $divide: [ "$totalTotal", "$totalItems" ] }