import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


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
}

export class LoginDto{ //for logi to check for the existing user
    @IsEmail({},{message:"please enter a valid email address"})
    email:string

    @IsString({message:"please field is required "})
    @MinLength(8)
    password:string
}


