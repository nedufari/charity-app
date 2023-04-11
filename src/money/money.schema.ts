import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document, ObjectId } from "mongoose";
import { User } from "../user/user.schema";
import { Transform, Type } from "class-transformer";
import { Posts } from "../Posts/post.schema";

export type MoneyDocument = Money & Document

@Schema({timestamps:true})
export class Money{
    @Transform(({ value }) => value.toString())
    _id: ObjectId;


    @Prop()
    amount:string

    @Prop()
    currency:string


    @Prop()
    reciept:string //uploaded image as proof of payment 

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:"User", required:true})
    @Type(()=>User)
    payer:User 

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Posts', required:true})
    @Type(()=>Posts)
    postID:mongoose.Schema.Types.ObjectId
}

export const MoneySchema =SchemaFactory.createForClass(Money)