const express = require('express')

const dotenv = require('dotenv')

const userRoutes = require('./routes/user/userRouters')

const serverless = require('serverless-http')
const cors = require('cors')

 const {connectDB} = require('./config/db')

//conection to DB
 connectDB()

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())// to allow sending of data in raw json format
app.use(express.urlencoded({extended: false})) //to accept url encoded form 


app.use('/api/users', userRoutes)


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`listening to port ${process.env.PORT? process.env.PORT: 3000}`);
})

module.exports.handler = serverless(app)