import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import * as bcrypt from "bcrypt"
import { UserDocument } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { UserDetails } from "../user/user.interface";
import { LoginDto, SignupDto } from "./dto/signup.dto";
import { JwtService } from "@nestjs/jwt";
import { MongoError } from "mongodb";

@Injectable()
export class AuthService{
    constructor( private userservice:UserService, private jwtservice:JwtService, @InjectModel("User") private readonly authmodel:Model<UserDocument>){

    }

    async hashpassword(password:string):Promise<string>{
        return await bcrypt.hash(password,12)
    }

    async comparepassword(password:string, hashpassword:string){
        return await bcrypt.compare(password,hashpassword)
    }


    async doesUserExist(email: string): Promise<boolean> {
        const user = await this.authmodel.findOne({email});
        return !!user;
      }

      async Register(user: SignupDto): Promise<UserDocument> {
        try {
            const { email, role, password, fullname } = user;
      
            const userExists = await this.doesUserExist(email);
            if (userExists) {
              throw new HttpException(
                `email: ${email} is already taken by another user`,
                HttpStatus.CONFLICT
              );
            }
          
            const hashedPassword = await this.hashpassword(password);
          
            const newUser = await this.userservice.create(fullname, email, hashedPassword, role);
            return await newUser.save();
            
        } catch (error) {
            if (error instanceof HttpException && error.getStatus()=== HttpStatus.CONFLICT){
                console.log(`user registratio failed: ${error.message}`)

            }else{
                throw error
            }
            
        }
      
      }
      


    async doesPasswordMatch (password:string, hahsedpassword:string):Promise<boolean>{
        return await this.comparepassword(password,hahsedpassword)
    }

    async validateUser(email:string, password:string):Promise<UserDocument|null>{
        const user= await this.userservice.finduserByemail(email) 
        const doesuserExist =  !!user
        if (!doesuserExist) return null 

        const doesPasswordMatch=  await this.doesPasswordMatch(password,user.password)
        if (!doesPasswordMatch) return null 

        return user
    }

    async login (dto:LoginDto):Promise<{token:string}>{
        const {email, password} = dto
        const user =  await this.validateUser(email,password)
        if (!user) throw new HttpException("credentials invalid!", HttpStatus.UNAUTHORIZED)

        const jwt =  await this.jwtservice.signAsync({user})
        return {token:jwt}
    }

    async verifyJwt (jwt:string):Promise<{exp :number}>{
        try {
            const {exp}=  await this.jwtservice.verifyAsync(jwt)
            return {exp}
            
        } catch (error) {
            throw new HttpException('invalid jwt ', HttpStatus.UNAUTHORIZED)
            
        }
    }

}