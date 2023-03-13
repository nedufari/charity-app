import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Posts } from "../Posts/post.schema";
import { User } from "../user/user.schema";

export type CommentDcument =Comment & Document

@Schema({timestamps:true})
export class Comment{
    @Prop()
    comment:string


    @Prop({type:mongoose.Schema.Types.ObjectId, ref:User.name})
    author:any

    




}

export const CommentSchema =SchemaFactory.createForClass(Comment)