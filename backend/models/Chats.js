import mongoose from "mongoose";

const chatSquema = new mongoose.Schema({

    description: {
        type: String,
        trim: true,
        required: true,
    },
    destinatario: {
        type: String,
        trim: true,
        required: true
    },
    emisor: {
        type: String,
        trim: true,
        required: true
    },
    emisorNickname: {
        type: String,
        trim: true,
        required: true
    },
    hora: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        public_id: String,
        secure_url: String
    }
});

export default mongoose.model("Chats", chatSquema);