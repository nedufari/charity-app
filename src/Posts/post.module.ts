import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../user/user.schema";
import { PostsController } from "./post.controller";
import { PostSchema } from "./post.schema";
import { PostsService } from "./posts.service";

@Module({
    imports:[MongooseModule.forFeature([{name:"Posts", schema:PostSchema}])],
    controllers:[PostsController],
    providers:[PostsService]
})

export class PostsModule{}