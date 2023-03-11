import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";
import { User } from "../user/user.schema";

export type BloodDocument = Blood & Document

@Schema({timestamps:true})
export class Blood{
    @Prop()
    bloodtype:string

    @Prop()
    amount:string

    // @Prop()
    // date:Date

    // @Prop()
    // donor:User //donor of the blood pile 
    
}

export const BloodSchema =SchemaFactory.createForClass(Blood)