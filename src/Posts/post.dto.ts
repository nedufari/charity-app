import { IsOptional, IsString ,IsNotEmpty, IsEmpty } from "class-validator"
import { User } from "../user/user.schema"


export class PostDto{
    @IsString()
    @IsNotEmpty()
    header:string 

    @IsString()
    @IsNotEmpty()
    caption:string

    @IsString()
    @IsOptional()
    postImage:string

    @IsEmpty({message:"user id canot be passed"})
    readonly author:User
}


export class UpdateDto{
    @IsString()
    @IsOptional()
    header:string 

    @IsString()
    @IsOptional()
    caption:string

    @IsString()
    @IsOptional()
    postImage:string

    @IsEmpty({message:"user id canot be passed"})
    readonly author:User

}