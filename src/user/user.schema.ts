import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Blood } from "../blood/blood.schema";
import { Comment } from "../comment/comment.schema";
import { Money } from "../money/money.schema";
import { Posts } from "../Posts/post.schema";
import { ReliefMAterial } from "../reliefmaterials/relief.schema";
import { Reply } from "../reply/reply.schema";
import { Roles } from "./roles.enum";

export type UserDocument = User & Document
@Schema({timestamps:true})
export class User extends Document{

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

    @Prop({ enum:Roles, default:Roles.ADMIN})
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

    @Prop()
    imagePath :string

    // relationships with various tables 
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Posts'}]})
    post:Posts[]

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]})
    comment:Comment[]

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Reply'}]})
    replies:Reply[]

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Blood'}]})
    bloodDoation:Blood[]

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'ReliefMaterial'}]})
    relifMatrials:ReliefMAterial[]

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Money'}]})
    moneyDonations:Money[]

}

export const UserSchema = SchemaFactory.createForClass(User)

