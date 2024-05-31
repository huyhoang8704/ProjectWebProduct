const mongoose = require('mongoose');


module.exports.connect = async () => {
    try {
    // 'mongodb+srv://huyhoang8704:0985769742a@cluster0.r3jnlvf.mongodb.net/ProductManagement'
       await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Tăng thời gian chờ kết nối
        socketTimeoutMS: 45000, // Tăng thời gian chờ socket
      })
       console.log("Mongodb Connect Successfully")
    } catch (error) {
        console.log(error)
        console.log("Mongodb Connect Failed")
    }
}
