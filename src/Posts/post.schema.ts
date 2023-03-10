
import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Document } from "mongoose";
import { User, UserSchema } from "../user/user.schema";


export type PostDocument = Posts & Document

@Schema({timestamps:true})
export class Posts{
    @Prop({required:true})
    header:string

    @Prop({required:true})
    caption:string


    @Prop()
    postImage:string

    // @Prop({type:mongoose.Schema.Types.ObjectId, ref:User.name})
    // author:User
 
    
}

export const PostSchema = SchemaFactory.createForClass(Posts)