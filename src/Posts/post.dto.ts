import { IsOptional, IsString ,IsNotEmpty, IsEmpty } from "class-validator"
import { User } from "../user/user.schema"


export class PostDto{

    @IsString()
    @IsNotEmpty()
    header:string 

    @IsString()
    @IsNotEmpty()
    content:string 


    @IsString()
    @IsOptional()
    postImage:string

    
}


export class UpdateDto{

    @IsString()
    @IsOptional()
    header:string 

    @IsString()
    @IsOptional()
    content:string 

   

    @IsString()
    @IsOptional()
    postImage:string

    

}