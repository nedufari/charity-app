import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Blood } from "../blood/blood.schema";
import { Comment } from "../comment/comment.schema";
import { Money } from "../money/money.schema";
import { Posts } from "../Posts/post.schema";
import { ReliefMAterial } from "../reliefmaterials/relief.schema";

import { Roles } from "./roles.enum";

export type UserDocument = User & Document
@Schema({timestamps:true})
export class User {

    /////////////////////////////////////////// shared schema for all forms of user 
    @Prop({required:true})
    fullname:string

    @Prop({unique:true,required:true})
    email:string

    @Prop({required:true})
    password:string

    @Prop()
    address:string

    @Prop()
    phone:string

    @Prop({ enum:Roles, default:Roles.DONATORS})
    role:Roles
    /////////////////////////////////////////////// agency info 

    @Prop()
    agencyName:string

    @Prop()
    body:string

    @Prop()
    header:string

    @Prop({length:10})
    account1:string

    @Prop()
    accountName:string

    @Prop()
    bankName:string

    @Prop()
    imagePath :string

    // relationships with various tables 
   

}

export const UserSchema = SchemaFactory.createForClass(User)
