const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = {
    //@route /api/users
    resetPassword: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body
            
            const userExist = await User.findOne({
                email
            })
      
            const hashedPassword = await bcrypt.hash(password, 10)



            if (userExist) {
            const result = await User.updateOne(
                {email:email}, 
                {$set : {password: hashedPassword}} 
           )
   
            if (result.modifiedCount === 1) {
                res.status(200).json({
                    message: "password updated succefully"
                })
            } else {
                res.status(404).json({
                    message: "User Not Found"
                })
            }
        }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    },
    registerUsers: async (req, res) => {
        try {
            const {
                first_name,
                last_name,
                email,
                isAdmin,
                password
            } = req.body
            // console.log(username, email, password);
            //@validation
            if ( !email || !password) {
                res.status(400)
                throw new Error('Please include all the empty fields')
            } else {


                // Find if the user exists
                const userExist = await User.findOne({
                    email
                })

                if (userExist) {

                    res.status(400)
                    throw new Error('Invalid credentials')
                }

                // Hash password

                const hashedPassword = await bcrypt.hash(password, 10)


                // Create user
                const user = await User.create({
                    first_name,
                    last_name,
                    isAdmin,
                    email,
                    password: hashedPassword
                })

                if (user) {
                    res.status(201).json({
                        message: "registered succefully"
                    })
                } else {
                    res.status(400).json({
                        message: "Invalid data"
                    })
                }
            }

        } catch (error) {
            res.status(401).json({
                message: error.message,
            })
            // console.log(process.env.Node_env);
        }
    },

    //@route /api/users/login
    loginUsers: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body

            const user = await User.findOne({
                email
            })

            if (user && (await bcrypt.compare(password, user.password))) {

                const token = jwt.sign({
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }, process.env.SECRET, {
                    expiresIn: "10hrs"
                })

                res.status(200).json({
                    id: user._id,
                    email: user.email,
                    first_name : user.first_name,
                    last_name : user.last_name,
                    isAdmin : user.isAdmin,
                    Token: token,
                     message: "login user succefully"
                })
            } else {
                res.status(400).json({
                    message: "Invalid credentials"
                })
            }


        } catch (error) {
            res.status(401).json({
                message: error.message
            })

        }
    },
    getUserDetails: async(req,res)=>{
        try {
            const {id,first_name,last_name,email} = req.info
            res.status(201).json({id,first_name,last_name,email})
        } catch (error) {
            res.status(401).json({message: error.message})
        }
    }
}