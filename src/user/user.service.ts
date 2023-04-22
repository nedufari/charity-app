import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./user.schema";
import * as bcrypt from "bcrypt"
import { UserDetails } from "./user.interface";
import { UpdateUserDto } from "./user.dto";
import {Query} from "express-serve-static-core"
import { of } from "rxjs";
import { Roles } from "./roles.enum";

@Injectable()
export class UserService{
    constructor(@InjectModel("User")private readonly usermodel:Model<UserDocument>){}

   

    async create(fullname:string, email:string, password:string, role:string):Promise<UserDocument>{
        const newUser = new this.usermodel({fullname, email, password,role})
        return newUser.save()
    }


   async finduserByemail(email:string):Promise<UserDocument|null>{
        return await this.usermodel.findOne({email}).exec()
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

    async getalluser():Promise<UserDocument[]>{
        return await this.usermodel.find({}).populate("posts").exec()
     }

   


}