import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    link: String,
    tags: [String],
    likes: { type: [String], default: [] },
    comments: {
        type: [
            {
                commenter: { type: String },
                comment: { type: String },
                timeAt: {
                    type: Date,
                    default: new Date()
                },
            }
        ],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const postMessage = mongoose.model('postMessage', postSchema);

export default postMessage;