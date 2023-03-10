import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator"
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
    account1:string

    @IsString()
    @IsOptional()
    account2:string

    @IsString()
    @IsOptional()
    address:string

    @IsString()
    @IsOptional()
    phone:string

    @IsEnum({Roles})
    @IsOptional()
    role:Roles
}

///// response or output dto 






