import { IsEmpty, IsOptional, IsString } from "class-validator";
import { Posts } from "../Posts/post.schema";
import { User } from "../user/user.schema";

export class PostCommentDto{
    @IsString()
    @IsOptional()
    comment :string 

    // @IsEmpty({message:"author id is not to be provided "})
    // readonly author:User

    // @IsEmpty({message:"author id is not to be provided "})
    // readonly post:Posts[]
}

