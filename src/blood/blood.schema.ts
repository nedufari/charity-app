import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document, ObjectId } from "mongoose";
import { User } from "../user/user.schema";
import { Transform, Type } from "class-transformer";
import { Posts } from "../Posts/post.schema";

export type BloodDocument = Blood & Document

@Schema({timestamps:true})
export class Blood{

    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    
    @Prop()
    bloodtype:string

    @Prop()
    amount:string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User', required:true})
    @Type(()=>User)
    donor:User

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Posts', required:true})
    @Type(()=>Posts)
    postId:Posts

    
}

export const BloodSchema =SchemaFactory.createForClass(Blood)