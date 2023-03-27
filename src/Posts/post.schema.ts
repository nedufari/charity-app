
import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Document } from "mongoose";
import { Blood } from "../blood/blood.schema";
import { Comment } from "../comment/comment.schema";
import { Money } from "../money/money.schema";
import { ReliefMAterial } from "../reliefmaterials/relief.schema";
import { User, UserSchema } from "../user/user.schema";


export type PostDocument = Posts & Document

@Schema({timestamps:true})
export class Posts{

    @Prop({reuired:true})
    header:string

    @Prop({required:true})
    content :string


    @Prop()
    postImage:string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User', required:true})
    author:any 

   

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Comment'})
    comments:any[]

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Blood'})
    bloodDonations:any[]

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Money'})
    MoneyDonations:any[]

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'ReliefMAterial'})
    ReliefMaterials:any[]

        


 
    
}

export const PostSchema = SchemaFactory.createForClass(Posts)