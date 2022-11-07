import {v2 as cloudinary} from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config.js';


cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
})

export async function subirImagen(filePath){
    return await cloudinary.uploader.upload(filePath, {
        folder: "chatapp"
    });
};

export async function borrarImagen(public_id){
    return await cloudinary.uploader.destroy(public_id);
};