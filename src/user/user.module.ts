import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "../Posts/post.schema";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.schema";
import { UserService } from "./user.service";

@Module({
    imports:[MongooseModule.forFeature([{name:"User", schema:UserSchema}])], //establishing the relationship
    providers:[UserService],
    controllers:[UserController],
    exports:[UserService]
})
export class UserModule{}
