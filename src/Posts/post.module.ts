import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BloodSchema } from "../blood/blood.schema";
import { BloodService } from "../blood/blood.service";
import { CloudiaryModule } from "../cloudinary/cloudinary.module";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CommentSchema } from "../comment/comment.schema";
import { CommentService } from "../comment/comment.service";
import { MoneySchema } from "../money/money.schema";
import { MoneyService } from "../money/money.service";
import { ReliefMaterialSchema } from "../reliefmaterials/relief.schema";
import { ReliefMaterialService } from "../reliefmaterials/rellief.service";
import { UserSchema } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { PostsController } from "./post.controller";
import { PostSchema } from "./post.schema";
import { PostsService } from "./posts.service";

@Module({
    imports:[MongooseModule.forFeature([
        {name:"Posts", schema:PostSchema},
        {name:"Comment", schema:CommentSchema},
        {name:"User", schema:UserSchema},
        {name:"Blood", schema:BloodSchema},
        {name:"Money", schema:MoneySchema},
        {name:"ReliefMaterial", schema:ReliefMaterialSchema}
        ]), CloudiaryModule],
    controllers:[PostsController] ,
    providers:[PostsService,UserService, CommentService, CloudinaryService, BloodService, MoneyService, ReliefMaterialService]
})

export class PostsModule{}