import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import * as bcrypt from "bcrypt"
import { UserDetails } from "./user.interface";
import { UpdateUserDto } from "./user.dto";
import {Query} from "express-serve-static-core"
import { of } from "rxjs";

@Injectable()
export class UserService{
    constructor(@InjectModel("User")private readonly usermodel:Model<UserDocument>){}

   

    async create(fullname:string, email:string, password:string):Promise<UserDocument>{
        const newUser = new this.usermodel({fullname, email, password})
        return newUser.save()
    }

// _getUser(user:UserDocument):UserDetails{ //private healper function 
//         return {
//             id: user._id,
//             fullname:user.fullname,
//             phone:user.phone,
//             address:user.address,    
//             email:user.email,
//             agencyname:user.agencyName,
//             account1:user.account1,
//             account2:user.account2,
//             header:user.header,
//             body:user.body,
//             role:user.role
            
//         }
//    }

   async finduserByemail(email:string):Promise<UserDocument|null>{
        return await this.usermodel.findOne({email}).exec()
   }

   async finduserByid(id:string):Promise<UserDocument|null>{
    const user = await this.usermodel.findById(id).exec()
    if (!user) return null
    return (user)
}

    async updateuser(id:string, dto:UpdateUserDto):Promise<UserDocument>{
        // const hahsedpassword = await  this.authservice.hashpassword(dto.password)
        let user = await this.finduserByid(id)
        user.account1=dto.account1 ?? user.account1
        user.account2=dto.account2 ??user.account2
        user.address=dto.address ?? user.address
        user.agencyName=dto.agencyName ?? user.agencyName
        user.body=dto.body ?? user.body
        user.email=dto.email ?? user.email
        user.fullname=dto.fullname ?? user.fullname
        user.header=dto.header ?? user.header
        user.phone=dto.phone ?? user.phone
        user.role = dto.role ?? user.role

        return user.save()
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
        return await this.usermodel.find().populate("post").exec()
     }

   


}