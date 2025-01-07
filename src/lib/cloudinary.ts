import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (file:string) => {
    try {
        if(!file) return null;
            const response = await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        })
        return response;
    } catch (error) {
        console.log("Error in uploading image",error)
        return null;
    }
}
