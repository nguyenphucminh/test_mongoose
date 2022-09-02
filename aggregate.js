const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/TestMongoose", ()=>{ console.log("connected")})

const Schema = mongoose.Schema
const ProductSchema = Schema({
    product: String,
    total: Number,
    customer: String,
},{
    collection: 'products'
})

const ProductModel = mongoose.model('products', ProductSchema)
ProductModel.aggregate(
    [
        {$match: {total: {$gte: 100}}},
        {$group: {_id: "$product", total: {$sum: "$total"}}},
        {$sort: {total: -1}}
    ]
)
.then(data=>{
    console.log(data)
})
.catch(err=>{console.log(err)})


// function createProduct (){
//     const pro = new ProductModel()
//     pro.product = 'tv samsung'
//     pro.total = 444
//     pro.customer = 'son'
//     pro.save()
//     console.log(pro)
// }
// createProduct()