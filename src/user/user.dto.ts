import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Posts } from "../Posts/post.schema"
import { Roles } from "./roles.enum"


export class UpdateUserDto{ 

    @IsEmail({},{message:"please enter a valid email address"})
    @IsOptional()
    email:string 

    @IsString()
    @IsOptional()
    @MinLength(8)
    password:string

    @IsString()
    @IsOptional()
    fullname:string//update

    @IsString()
    @IsOptional()
    agencyName:string

    @IsString()
    @IsOptional()
    body:string

    @IsString()
    @IsOptional()
    header:string

    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(10)
    account1:string

    @IsString()
    @IsOptional()
    accountName:string

    @IsString()
    @IsOptional()
    address:string

    @IsString()
    @IsOptional()
    phone:string


    @IsString()
    @IsOptional()
    imagepath:string

    @IsString()
    @IsOptional()
    bankName:string

    @IsOptional()
    posts:Posts[]
}

///// response or output dto 






