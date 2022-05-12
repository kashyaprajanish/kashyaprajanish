const userModel = require('../models/mongoose/users')


const masterAdmin = new userModel({
    userName:{
        firstName:"master",
        lastName:"Admin",
    },
    email:"master@admin.in",
    role:"MA",
    phoneNo:"99999999999",
    userImage:"",
    password:"$2b$10$3LA.y/JSRcUYSAwNRuTLf.rSBU6pdZQyNkjt.b2IVQuxkXxxXuFDC",
})

masterAdmin.save().then((doc)=>{
    console.log(doc)
    process.exit(1)
}).catch((err=>{
    console.log(err)
    process.exit(1)
}))