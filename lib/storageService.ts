import { supabase } from "./supabase";
import { decode } from "base64-arraybuffer";

const storageService = {
  getImageUrl(bucketName: string, filePath: string) {
    try {
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return data?.publicUrl;
    } catch (error: any) {
      console.log("Unable to get image url: ", error.message);
    }
  },

  async uploadImage(avatarFile: any, filePath: string, bucketName: string) {
    
    //const filePath = `public/avatar${Date.now()}.png`;

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, decode(avatarFile.base64), {
          contentType: "image/png",
          upsert: true
        });

      return {
        data: data,
        error: error,
      };
    } catch (error: any) {
      console.log("File upload error: ", error.message);
      return {
        error: error.message || "File upload failed!",
      };
    }
  },

  async updateImage(avatarFile: any, filePath: string, bucketName: string) {
    try {

        const { data, error } = await supabase
        .storage
        .from(bucketName)
        .update(filePath, decode(avatarFile.base64), {
            contentType: 'image/png',
            upsert: true
        })

        if (error) {
          console.log("updateImage Error: ", error.message);
        }

        return{ data, error }

    } catch (error: any) {
      return {
        error: error.message || "File update failed!",
      };
    }
  },
};

export default storageService;
