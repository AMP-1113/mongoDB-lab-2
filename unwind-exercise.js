// How much money did Ronda make this week?
db.sales.aggregate([
    { $match: { staff: "Ronda" } },
    { $unwind: "$sales" },
    { $group: { 
        _id: null,
        totalSales: { $sum: "$sales.total" }
     } }
])

// How much money did each staff member make this week?
db.sales.aggregate([
    { $unwind: "$sales" },
    { $group: { 
        _id: "$staff",
        totalSales: { $sum: "$sales.total" }
     } },
     {$project: {
         staff: "$_id",
         totalSales: true,
         _id: false
     }}
])

// What is the average price per drink?
db.sales.aggregate([
    // unwind to get each sale into its own document
    { $unwind: "$sales" },
    // group to find sum of drinks and totals
    { $group: {
        _id: null,
        totalItems: { $sum: "$sales.items" },
        totalTotal:{ $sum: "$sales.total" }
    } },
    // project to calculate price per drink
    { $project: {
        _id: false,
        pricePerDrink: { $divide: [ "$totalTotal", "$totalItems" ] }
    } }
])

// What is the average % tip?
db.sales.aggregate([
    { $unwind: "$sales" },
    { $group: {
        _id: null,
        totalTotal: { $sum: "$sales.total" },
        tipTotal: { $sum: "$sales.tip" },
    } },
    { $project: {
        _id: false,
        percentTip: { $multiply: [{$divide: [ "$tipTotal", "$totalTotal" ]}, 100]}
    }}
])

// What is the average % tip per staff member?
db.sales.aggregate([
    
])

// What is the average order total for each day of the week?
db.sales.aggregate([
    
])

// Which day has the most tips?
db.sales.aggregate([
    
])
