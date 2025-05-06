
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        default: ""
    },
    searchHistory: {
        type: Array,
        default: []
    }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema);