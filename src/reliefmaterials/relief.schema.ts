import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document, ObjectId } from "mongoose";
import { User } from "../user/user.schema";
import { Transform, Type } from "class-transformer";
import { Posts } from "../Posts/post.schema";

export type ReliefMaterialDocument = ReliefMAterial & Document

@Schema({timestamps:true})
export class ReliefMAterial{

    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop()
    description:string

    @Prop()
    image:string


    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User', required:true})
    @Type(()=>User)
    donor:User //relations with the user 

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Posts', required:true})
    @Type(()=>Posts)
    postId:Posts //relations with the user 
}


export const ReliefMaterialSchema =SchemaFactory.createForClass(ReliefMAterial)