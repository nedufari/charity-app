import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../user/user.schema";

export type ReplyDocument =Reply & Document

@Schema({timestamps:true})
export class Reply {
   

    @Prop()
    reply:string 

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:User.name})
    author:User


}

export const ReplySchema =SchemaFactory.createForClass(Reply)