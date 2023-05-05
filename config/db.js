const mongoose = require('mongoose')

module.exports = {

    connectDB: async () => {
        try {
           // const conn = await mongoose.connect(process.env.Mongo_URL)
           const conn = await mongoose.connect("mongodb+srv://kinuthiakaranja0:kinuthia98@cluster0.yh6lbvf.mongodb.net/pathology?retryWrites=true&w=majority")

            console.log(`Mongodb connected : ${conn.connection.host}`);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            process.exit(1) // this make it to exit with failure and exits the entire process
        }
    }
}