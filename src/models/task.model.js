import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', 'Under Review', 'Done'],
        default: 'To Do'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'Urgent'],
        default: 'Low'
    },
    deadline: {
        type: String
    }
}, {
    timestamps: true
});


export const Task = mongoose.model("Task", taskSchema)

