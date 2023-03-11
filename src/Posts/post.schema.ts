
import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Document } from "mongoose";
import { Comment } from "../comment/comment.schema";
import { Reply } from "../reply/reply.schema";
import { User, UserSchema } from "../user/user.schema";


export type PostDocument = Posts & Document

@Schema({timestamps:true})
export class Posts{
    @Prop({required:true})
    header:string

    @Prop({required:true})
    caption:string


    @Prop()
    postImage:string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:User.name})
    author:User

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Comment.name})
    comments:Comment

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Reply.name})
    replies:Reply


 
    
}

export const PostSchema = SchemaFactory.createForClass(Posts)