const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected")
}).catch(()=>{
    console.log("failed to connect");
})

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("userEmails", emailSchema);
