// models/user.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: String,
    city: String,
})
const UserSchema = new Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate:{
            validator: v=> v%2 ===0,
            message: prop => `${prop.value} is not an even number`
        },
    },
    email:{
        type: String,
        minLength: 10,
        required: true,
        lowercase: true,
    },
    // createdAt:{
    //     type: Date,
    //     immutable: true,
    //     default: ()=> Date.now(),
    // },
    // updatedAt:{
    //     type: Date,
    //     default: ()=> Date.now()
    // },
    address: addressSchema,
})

UserSchema.methods.sayHi = function(){
    console.log(`Hi. My Name Is ${this.name}`)
}

UserSchema.statics.findByName = function(name){
    return this.find({name: new RegExp(name, 'i')})
}

UserSchema.query.byName = function(name){
    return this.where({name: new RegExp(name, 'i')})
}

UserSchema.virtual('namedEmail').get(function(){
    return `${this.name}<${this.email}>`
})

UserSchema.pre('save', function(next){
    this.name = 'abc'
    next()
})

UserSchema.post('save', function(doc, next){
    doc.sayHi()
    next()
})
module.exports =  mongoose.model('User', UserSchema)