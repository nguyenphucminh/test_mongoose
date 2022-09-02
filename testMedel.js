const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/TestMongoose", ()=>{ console.log("connected")})

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    name: String,
    age: Number,
    pass: String,
    // courses: {
    //     type: String,
    //     ref: 'courses'
    // }
},{
    collection: 'account'
});

const CoursesSchema = new Schema({
    nameCourses: String,
    teacher: String,
    lesson: Number,
},{
    collection: 'courses'
})

// ============================================================

const AccountModel = mongoose.model('account', AccountSchema)
const CoursesModel = mongoose.model('courses', CoursesSchema) 


// AccountModel.find({
//     name: 'minh'
// })
// .populate('courses')
// .then(data=>{
//     console.log(data)
// })
// .catch(err=> console.log(err))