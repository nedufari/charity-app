import { IsOptional, IsString ,IsNotEmpty } from "class-validator"


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
}