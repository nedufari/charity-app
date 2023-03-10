import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";
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

    @Prop()
    payer:User //relations to who made the payment 
}

export const MoneySchema =SchemaFactory.createForClass(Money)