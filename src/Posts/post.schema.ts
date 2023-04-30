
import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import mongoose, { Document, ObjectId } from "mongoose";
import { Blood } from "../blood/blood.schema";
import { Comment } from "../comment/comment.schema";
import { Money } from "../money/money.schema";
import { ReliefMAterial } from "../reliefmaterials/relief.schema";
import { User, UserDocument, UserSchema } from "../user/user.schema";


export type PostDocument = Posts & Document

@Schema({timestamps:true})
export class Posts{

    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({reuired:true})
    header:string

    @Prop({required:true})
    content :string


    @Prop()
    postImage:string



    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User', required:true})
    @Type(()=>User)
    author:User

   

    @Prop({type:Comment})
    @Type(()=>Comment)
    comments:Comment[]

    @Prop({type:Blood})
    @Type(()=>Blood)
    bloodDonations:Blood[]

    @Prop({type:Money})
    @Type(()=>Money)
    MoneyDonations:Money[]

    @Prop({type:ReliefMAterial})
    @Type(()=>ReliefMAterial)
    ReliefMaterials:ReliefMAterial[]
    


        


 
    
}

export const PostSchema = SchemaFactory.createForClass(Posts)