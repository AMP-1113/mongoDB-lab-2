// 1. List all drinks alphabetically by name. ($sort)
db.menu.aggregate([
    { $sort: { name: 1 } }
])

// 2. List only the first 3 drinks, sorted alphabetically by name. ($sort, $limit)
db.menu.aggregate([
    { $sort: {name: 1} },
    { $limit: 3 }
])

// 3. List the next 3 drinks (4-6), sorted alphabetically by name. ($sort, $skip, $limit)
db.menu.aggregate([
    { $sort: {name: 1} },
    { $skip: 3 },
    { $limit: 3 }
])

// 4. List all drinks alphabetically by name. Only show the name of each. ($sort, $project)
db.menu.aggregate([
    { $sort: {name: 1} },
    { $project: {name: true , _id: false } }
])

// 5. Get all drinks over 3 dollars. ($match)
db.menu.aggregate([
    { $match: {price: {$gt: 3}} }
])

// 6. Get all espresso drinks.
db.menu.aggregate([
    { $match: {type: 'Espresso'} }
])

// 7. Get only the espresso type drinks. Sort them by price, highest first.
db.menu.aggregate([
    { $match: {type: 'Espresso'} },
    { $sort: { price: -1 } }
])

// 8. Get the lowest price of any drink. (Just the price.) ($group) { _id: null, price : 2.0 }
db.menu.aggregate([
    { $group: {
        _id: null,
        price: { $min: "$price" }
    } }
])

// 9. Get the average price of all drinks.
db.menu.aggregate([
    { $group: {
        _id: null,
        average: { $avg: "$price" }
    } }
])

// 10. Get the average price for each type of drink. Name it averagePrice.
db.menu.aggregate([
    { $group: {
        _id: "$type",
        averagePrice: { $avg: "$price" }
    } }
])

// 11. Get the most expensive price for each type of drink. Name it topPrice.
db.menu.aggregate([
    { $group: {
        _id: "$type",
        topPrice: { $max: "$price" }
    } }
])

// 12. Get the average price for each type of drink. The results should have field names “type” and “averagePrice”. ($project) Sort the results with the most expensive first.
db.menu.aggregate([
    { $group: {
        _id: "$type",
        averagePrice: { $avg: "$price" }
    } },
    {$project: {
        type: "$_id",
        averagePrice: true,
        _id: false
    }},
    {$sort: {averagePrice: -1}}
])

// 13. Get the two most expensive drinks. ($sort, $limit)
db.menu.aggregate([
    { $sort: {price: -1} },
    { $limit: 2 }
])