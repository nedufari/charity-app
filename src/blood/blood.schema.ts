import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";
import { User } from "../user/user.schema";

export type BloodDocument = Blood & Document

@Schema({timestamps:true})
export class Blood{
    @Prop()
    bloodtype:string

    @Prop()
    amount:string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User', required:true})
    donor:any

    
}

export const BloodSchema =SchemaFactory.createForClass(Blood)