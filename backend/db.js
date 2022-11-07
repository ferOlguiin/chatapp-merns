import mongoose from "mongoose";
import { URI_MONGODB } from "./config.js";

export async function conectarDB() {
    try {
        const db = await mongoose.connect(URI_MONGODB);
        console.log(`conectado a la base de datos ${db.connection.name} 😁`);
    } catch (error) {
        console.log(error);
    }
}