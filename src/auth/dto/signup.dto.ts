import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator"
import { Roles } from "../../user/roles.enum"



export class SignupDto{
    @IsString()
    @IsNotEmpty({message:"please field is required "})
    fullname:string

    @IsNotEmpty({message:"please field is required "})
    @IsEmail({},{message:"please enter a valid email address hint: email@gmail.com , email@yahoo.com, email@hotmail.com, email.outlook.com"})
    email:string

    @IsString()
    @MinLength(8)
    @IsNotEmpty({message:"please enter a valid email address hint: email@gmail.com , email@yahoo.com, email@hotmail.com, email.outlook.com"})
    password:string

    @IsEnum(Roles)
    @IsNotEmpty({message:"you must indicate the kid of user you are signing up as, please here are the examples"})
    role:Roles
}

export class LoginDto{ //for logi to check for the existing user
    @IsEmail({},{message:"please enter a valid email address"})
    email:string

    @IsString({message:"please field is required "})
    @MinLength(8)
    password:string
}


