const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {type: String, required:true},
        completed: {type: Boolean, default:false},
        priority:{type:String,enum: ["bassa", "media", "alta"]}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Task", taskSchema);