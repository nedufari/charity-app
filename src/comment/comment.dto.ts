import { IsOptional, IsString } from "class-validator";

export class PostCommentDto{
    @IsString()
    @IsOptional()
    comment :string 
}

