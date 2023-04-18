import { Injectable } from "@nestjs/common";
import { v2,UploadApiErrorResponse,UploadApiResponse } from "cloudinary";
import {toStream} from "buffer-to-stream"

@Injectable()
export class CloudinaryService{
    async uploadimage(image:Express.Multer.File):Promise<UploadApiResponse|UploadApiErrorResponse>{
        return new Promise((resolve,reject)=>{
            const upload =v2.uploader.upload_stream((error,result)=>{
                if (error) return reject(error)
                resolve(result)
            }) 
            toStream(image.buffer).pipe(upload)

            //, { highWaterMark: 1024 * 1024 }

        })
        
    

    }
}