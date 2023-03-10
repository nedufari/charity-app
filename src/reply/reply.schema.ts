import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ReplyDocument =Reply & Document

@Schema({timestamps:true})
export class Reply {
   

    @Prop()
    reply:string 


}

export const ReplySchema =SchemaFactory.createForClass(Reply)