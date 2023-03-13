import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentSchema } from "../comment/comment.schema";
import { CommentService } from "../comment/comment.service";
import { UserSchema } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { PostsController } from "./post.controller";
import { PostSchema } from "./post.schema";
import { PostsService } from "./posts.service";

@Module({
    imports:[MongooseModule.forFeature([
        {name:"Posts", schema:PostSchema},
        {name:"Comment", schema:CommentSchema},
        {name:"User", schema:UserSchema}
        ])],
    controllers:[PostsController] ,
    providers:[PostsService,UserService, CommentService]
})

export class PostsModule{}