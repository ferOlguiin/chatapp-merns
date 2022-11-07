import mongoose from "mongoose";

const userSquema = new mongoose.Schema({

    nickname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
    },
    connection: {
        type: String
    },
    image: {
        public_id: String,
        secure_url: String
    }
});

export default mongoose.model("Users", userSquema);