const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/TestMongoose", ()=>{ console.log("connected")})
var User = require('./User');

async function find() {
    var user = await User.findOne({name:"abc"})
    await user.save()
    console.log(user)
    console.log(user.namedEmail)
}   
find()
// function abc() {
//     var user = new User(); // TypeError: User is not a constructor
//     user.name = "tien"
//     user.age = 40
//     user.email = "tientien@gmail.com"
//     user.address = {
//         street: "1212ss âxđs",
//         city: "TPHCM",
//     }
//     user.save()
// }
// abc()