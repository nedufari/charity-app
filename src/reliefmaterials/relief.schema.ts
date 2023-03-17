import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";
import { User } from "../user/user.schema";

export type ReliefMaterialDocument = ReliefMAterial & Document

@Schema({timestamps:true})
export class ReliefMAterial{
    @Prop()
    description:string

    @Prop()
    image:string

    // @Prop()
    // date:Date

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:User.name})
    donor:User //relations with the user 
}

export const ReliefMaterialSchema =SchemaFactory.createForClass(ReliefMAterial)