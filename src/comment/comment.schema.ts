import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { Posts } from "../Posts/post.schema";
import { User } from "../user/user.schema";
import { Transform, Type } from "class-transformer";

export type CommentDcument =Comment & Document

@Schema({timestamps:true})
export class Comment{

    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    
    @Prop()
    comment:string


    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User', required:true})
    @Type(()=>User)
    author:User



    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Posts', required:true})
    @Type(()=>Posts)
    postID:mongoose.Schema.Types.ObjectId
    




}

export const CommentSchema =SchemaFactory.createForClass(Comment)