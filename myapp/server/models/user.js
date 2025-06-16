const { type } = require('@testing-library/user-event/dist/cjs/utility/type.js');
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name: { type: String, required: true},
    email:{type: String, required: true, unique: true},
    friends: [
        {
            name: String,
            email: String,
        }
    ]
});

module.exports=mongoose.model('user',userSchema);