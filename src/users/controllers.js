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

// {
//     "username" : "Dave",
//     "updateKey": "email",
//     "updateValue" : "dave@email.com"
// }
async function updateUser (req, res) {
    try {
        console.log(req.body.updateKey)
        console.log(req.body.updateValue)
        await User.updateOne(
            //find the user we want to update buy filtering the database by username
            {username: req.body.username},
            //use the key that we pass in the body of the request so we can dynamically update any key in our 
            //database. the value is what we want to update it too
            {[req.body.updateKey]: req.body.updateValue}
        )
        res.status(200).send({message: "A user felid as been updated"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
} 

async function deleteUser (req, res) {
    try {
        //pass the username we pass in the req.body to the deleteOne method that deletes a user from our database
        await User.deleteOne({username: req.body.username})
        res.status(200).send({message: "A user successfully deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}



module.exports= {registerUser, login, readUsers, updateUser, deleteUser};