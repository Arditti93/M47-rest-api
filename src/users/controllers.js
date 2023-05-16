const User = require("./model");
// {
//     "username" : "Alex",
//     "email": "alex@email.com",
//     "password" : "password"
//   }
async function registerUser(req,res) {
    console.log("registerUser controller")
    console.log(req.body.password)
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).send({ message: "Account succesfully created",
                                user: req.body.username})
    } catch (error) {
        console.log(error);
        res.status(501).send({message: error.message});
    }
}

async function login (req,res){
    try {
        console.log("login controller")
        res.status(200).send({message: "Success", user: req.body.username})
    } catch (error) {
        console.log(error);
        res.status(501).send({message: error.message});
    }
}

async function readUsers (req, res){
    try {
        //call .find mongoose method with no parameters so all users will be returned and sent in the response
        const users = await User.find({})
        res.status(200).send({users: users})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

module.exports= {registerUser, login, readUsers};