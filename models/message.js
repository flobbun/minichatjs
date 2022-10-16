import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
    username: {
        type: String,
        default: "System"
    },
    message: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
