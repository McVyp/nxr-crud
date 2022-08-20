
// controller

// get users
// get: http://localhost:3000/api/users
import Users from "../model/user"
export async function getUsers(req, res){
    try{
        const users= await Users.find({})
        if(!users) return res.status(404).json({error: "Data not Found"})
        res.status(200).json(users)
    }
    catch(err){
        res.status(404).json({error: "Error While Fetching Data"})
    }
}

// get Single user
// get: http://localhost:3000/api/users/1


export async function getUser(req, res){
    try {
        const { userId } = req.query;

        if(userId){
            const user = await Users.findById(userId);
            res.status(200).json(user)
        }
        res.status(404).json({ error : "User not Selected...!"});
    } catch (error) {
        res.status(404).json({ error: "Cannot get the User...!"})
    }
}

// create new data
// post: http://localhost:3000/api/users

export async function postUser (req, res){
    try{
        const formData = req.body;
        if(!formData) return res.staus(404).json({error: "Form Data Not Provided"});
        Users.create(formData, function(err, data){
            return res.status(200).json(data)
        })
    }
    catch(err){
        return res.status(404).json({err})
    }
}

// update
// put: http://localhost:3000/api/users/1
export async function putUser(req,res){
    try{
        const {userId} =req.query;
        const formData = req.body;

        if(userId && formData){
            const user = await Users.findByIdAndUpdate(userId, formData)
            res.status(200).json(user)
        }
        res.status(404).json({error: "user not selected"})
    }catch(err){
        res.status(404).json({err: "Error while updateing the data"});
    }
}

// delete
// put: http://localhost:3000/api/users/1

export async function deleteUser(req, res){
    try{
        const {userId} = req.query;

        if(userId){
            const user = await Users.findByIdAndDelete(userId)
            return res.status(200).json(user)
        }

        res.status(404).json({error: "user not selected"})
    }
    catch(err){
        res.status(404).json({err: "Error While Deleting the User"})
    }
}