const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/TestMongoose", ()=>{ console.log("connected")})
var User = require('./User');

// async function find() {
//     var user = await User.findOne({name:"abc"})
//     console.log(user.namedEmail)
// }   
// find()


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


// User.updateOne({_id:"631076a84c592f9c4bfbcd81"}, {name: 'minh'})
// .then(data=>{
//     console.log(data)
// })
// .catch(err=>{
//     console.log(err)
// })

// User.deleteOne({_id:"631076a84c592f9c4bfbcd81"})
// .then(()=>{
//     console.log('good')
// })
// .catch((err)=>{
//     console.log(err)
// })