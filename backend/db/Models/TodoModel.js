import mongoose from "mongoose";
const { Schema } = mongoose;

// Modelleme
const todoSchema = new Schema({

    // doc | field
    // doc icinde görünmez bir _id var.
    
    task: {
        type: String,
    },

    completed: {

        type: Boolean,
        default: false
    },


}, {

    // options (Opsiyonlar)
    timestamps: true
})



// model olarak dışarı çıkart
const todo_model = mongoose.model("todos", todoSchema)


export default todo_model