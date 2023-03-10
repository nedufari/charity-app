import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CommentDcument =Comment & Document

@Schema({timestamps:true})
export class Comment {
    @Prop()
    comment:string

    @Prop()
    reply:string 


}

export const CommentSchema =SchemaFactory.createForClass(Comment)