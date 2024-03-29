import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./user.schema";
import * as bcrypt from "bcrypt"
import { UserDetails } from "./user.interface";
import { UpdateUserDto } from "./user.dto";
import {Query} from "express-serve-static-core"
import { of } from "rxjs";
import { Roles } from "./roles.enum";
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as fileType from 'file-type';

@Injectable()
export class UserService{
    constructor(@InjectModel("User")private readonly usermodel:Model<UserDocument>){}

   

    async create(fullname:string, email:string, password:string, role:string):Promise<UserDocument>{
        const newUser = new this.usermodel({fullname, email, password,role})
        return newUser.save()
    }


   async finduserByemail(email:string):Promise<UserDocument>{
        return await this.usermodel.findOne({email})
   }

   async finduserByid(id:string):Promise<UserDocument|null>{
    const user = await this.usermodel.findById(id).exec()
    if (!user) return null
    return (user)
}

async updateuser(id: string, dto: UpdateUserDto): Promise<UserDocument> {
   
    let user = await this.usermodel.findByIdAndUpdate(id, dto, { new: true });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user.save();
  }
  

  

   async searchuser(query:Query):Promise<UserDocument[]>{

        const respage=2
        const curretpage =Number(query.page) || 1
        const skip =respage *(curretpage -1)


        const keyword= query.keyword ? {
            fullname:{
                $regex:query.keyword,
                $options:'i'
            },
    }:{}


        return await  this.usermodel.find({...keyword}).skip(skip).limit(respage).exec()
    }


    async searchuserbyemail(query:Query):Promise<UserDocument[]>{

        const respage=2
        const curretpage =Number(query.page) || 1
        const skip =respage *(curretpage -1)


        const keyword= query.keyword ? {
            email:{
                $regex:query.keyword,
                $options:'i'
            },
    }:{}


        return await  this.usermodel.find({...keyword}).skip(skip).limit(respage).exec()
    }

    async fetchAlluser(page = 1, limit = 10): Promise<UserDocument[]> {
    const skip = (page - 1) * limit;
    console.log("before find() method")
    const users = await this.usermodel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
      console.log("after find()method")
      return users
  }

  async fetchsingleuser(id:string): Promise<UserDocument> {
    
    console.log("before find() method")
    const users = await this.usermodel
      .findOne({_id:id})
      
      console.log("after find()method")
      return users
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
    
      async updatePhoto(Id: string, filename: string): Promise<User> {
        if (!Id) {
          throw new Error(`user ID is missing`);
        }
      
        const post = await this.usermodel.findById(Id);
      
        if (!post) {
          throw new Error(`Post with ID ${Id} not found`);
        }
      
        const photoUrl =`https://charity-app.up.railway.app/public/${filename}`
  
        post.imagePath = photoUrl;
        return post.save();
      }


      async deleteuser(id: string) {
        const user = await this.usermodel.findById(id);
        if (!user) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
  
        return await user.deleteOne();
}

   


}