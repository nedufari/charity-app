import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class SignupDto{
    @IsString()
    @IsNotEmpty({message:"please fild is required "})
    fullname:string

    @IsNotEmpty({message:"please fild is required "})
    @IsEmail({},{message:"please enter a valid email address"})
    email:string

    @IsString()
    @MinLength(8)
    @IsNotEmpty({message:"please fild is required "})
    password:string
}

export class LoginDto{ //for logi to check for the existing user
    @IsEmail({},{message:"please enter a valid email address"})
    email:string

    @IsString({message:"please fild is required "})
    @MinLength(8)
    password:string
}


