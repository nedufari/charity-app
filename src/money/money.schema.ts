import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";
import { User } from "../user/user.schema";

export type MoneyDocument = Money & Document

@Schema({timestamps:true})
export class Money{
    @Prop()
    amount:string

    @Prop()
    currency:string

    // @Prop()
    // date:Date

    @Prop()
    reciept:string //uploaded image as proof of payment 

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:User.name})
    payer:any 
}

export const MoneySchema =SchemaFactory.createForClass(Money)