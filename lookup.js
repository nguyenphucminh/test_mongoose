const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/TestMongoose", ()=>{ console.log("connected")})

const Schema = mongoose.Schema
const ASchema = Schema({
    city: String,
    country: String,
},{
    collection: 'A'
})

const BSchema = Schema({
    people: Number,
    where: String,
},{
    collection: 'B'
})
// ============================================================

const AModel = mongoose.model('A', ASchema)
const BModel = mongoose.model('B', BSchema) 
const a = AModel.find()
BModel.aggregate([
    {
        $lookup: {
            from: 'a',
            localField: "where",
            foreignField: "city",
            as: "place"
        }
    }
])
.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
})
