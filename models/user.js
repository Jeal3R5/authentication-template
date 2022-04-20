const mongoose = require('./connection');

//Use JS destructuring syntax to unpack properties from mongoose
const { Schema, model } = mongoose   //is saying to find a variable named Schema/model and create a new variable w/ same name 

const userSchema = new Schema ({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true}
});


// User Model
const User = model("User", userSchema);

module.exports = User;