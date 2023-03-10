import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Posts } from "../Posts/post.schema";
import { Roles } from "./roles.enum";

export type UserDocument = User & Document
@Schema({timestamps:true})
export class User{

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

    @Prop({ enum:Roles, default:Roles.AGENCY})
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

    @Prop({length:10})
    account2:string

    // @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Posts'}]})
    // post:Posts[]

}

export const UserSchema = SchemaFactory.createForClass(User)

