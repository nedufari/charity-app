
import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Document } from "mongoose";
import { Comment } from "../comment/comment.schema";
import { User, UserSchema } from "../user/user.schema";


export type PostDocument = Posts & Document

@Schema({timestamps:true})
export class Posts{
    @Prop({required:true})
    content :string


    @Prop()
    postImage:string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:User.name})
    author:any 

   

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Comment.name})
    comments:any[]

    


 
    
}

export const PostSchema = SchemaFactory.createForClass(Posts)