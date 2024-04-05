import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;


const userSchema = new Schema({


    // dictrimator yapilacak
    name: {

        type: String,
        required: true
    },

    email: {

        type: String,
        unique: true,
        required: true
    },

    password: {

        type: String,
        required: true
    },

    roles: {

        type: [],
        default: ["User"]
        // role: User | Admin
    }

}, {

    timestamps: true
})


const userModel = mongoose.model("users", userSchema)


export default userModel