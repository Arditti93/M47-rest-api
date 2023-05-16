const bcrypt = require('bcrypt');

const User = require("../users/model");

//MIDDLEWARE FUNCTION
async function hashThePassword (req,res,next) {
    console.log("hashThePassword Middleware function")
    console.log(req.body.password)
    try {
        //code to hash a password
        req.body.password = await bcrypt.hash(req.body.password, 10)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
        // catch errors if any code in the try block fails
    }
}

async function comparePasswords (req,res,next){
    try {
        console.log("PLAIN TEXT PASSWORD")
        console.log(req.body.password)
        // req.body.password with the hashed password that we've stored in the databse

        // the hashed version from the database to compare the plain text version with the hashed password
        
        // find user in our database using the username passed in the body of the request
        // userInfo is an object
        let userInfo = await User.findOne({username: req.body.username})
        console.log(userInfo)

        // compare the plain text password with the hashed password stored in the database
        // the .compare()method  takes 2 values, the first is the plain text password, 
        // the second is the hash version loaded from our databse

        if(userInfo && await bcrypt.compare(req.body.password, userInfo.password)) { 
            console.log("User found in our database and passwords match")           
            next()
        } else {
            throw new Error ("username or password is incorrect")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

module.exports = {
    hashThePassword,
    comparePasswords
}