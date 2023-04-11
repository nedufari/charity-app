import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ReliefMaterialDto } from "./relief.dto";
import { ReliefMaterialDocument } from "./relief.schema";
import { User } from "../user/user.schema";
import { Posts } from "../Posts/post.schema";

@Injectable()
export class ReliefMaterialService{
    constructor(@InjectModel("ReliefMaterial") private readonly reliefmodel:Model<ReliefMaterialDocument>){}

    async makedonation(reliedmaterialdto:ReliefMaterialDto, userid:User, postid:string){
        try {
            let reliefmaterial = new this.reliefmodel({
                ...reliedmaterialdto,
                donor:userid,
                postId:new mongoose.Types.ObjectId(postid)
            })
            reliefmaterial= await  reliefmaterial.save()
            return reliefmaterial;
            
        } catch (error) {
            return error
            
        }
       
    }
    
}