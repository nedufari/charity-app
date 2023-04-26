import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ReliefMaterialDto } from "./relief.dto";
import { ReliefMAterial, ReliefMaterialDocument } from "./relief.schema";
import { User } from "../user/user.schema";
import { Posts } from "../Posts/post.schema";
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as fileType from 'file-type';

@Injectable()
export class ReliefMaterialService{
    constructor(@InjectModel("ReliefMaterial") private readonly reliefmodel:Model<ReliefMaterialDocument>){}

    async makedonation(reliedmaterialdto:ReliefMaterialDto, userid:User, postid:string){
        try {
            let reliefmaterial = new this.reliefmodel({
                ...reliedmaterialdto,
                donor:userid,
                postId:new mongoose.Types.ObjectId(postid)
            })
            reliefmaterial= await  reliefmaterial.save()
            return reliefmaterial;
            
        } catch (error) {
            return error
            
        }
       
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const extension = extname(file.originalname).toLowerCase();
    
        if (!allowedExtensions.includes(extension)) {
          throw new BadRequestException(
            'Only images with the following extensions are allowed: ' +
              allowedExtensions.join(', '),
          );
        }
    
        const fileInfo = await fileType.fromBuffer(file.buffer);
    
        if (!fileInfo || !fileInfo.mime.startsWith('image/')) {
          throw new BadRequestException('Only image files are allowed');
        }
        if (!fs.existsSync('public')) {
          fs.mkdirSync('public');
        }
    
        const filename = uuidv4() + extension;
        const filePath = `public/${filename}`;
    
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(file.buffer);
        writeStream.end();
    
        return filename;
      }
    
      async updatePhoto(reliefId: string, photoUrl: string): Promise<ReliefMAterial> {
        if (!reliefId) {
          throw new Error(`Post ID is missing`);
        }
      
        const post = await this.reliefmodel.findById(reliefId);
      
        if (!post) {
          throw new Error(`Post with ID ${reliefId} not found`);
        }
      
        post.image = photoUrl;
        return post.save();
      }



    
}