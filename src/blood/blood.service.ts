import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { BloodDonationDto, bloodResponse } from "./blood.dto";
import { Blood, BloodDocument } from "./blood.schema";
import { User } from "../user/user.schema";
import { Posts } from "../Posts/post.schema";

@Injectable()
export class BloodService {
    constructor(@InjectModel("Blood") private readonly bloodmodel:Model<BloodDocument>){}

    async donateblood(blooddto:BloodDonationDto, userId:User, postid:string ){
        try {
            let newblood = new this.bloodmodel({
              ...blooddto,
            donor:userId,
            postId:new mongoose.Types.ObjectId(postid)
          });
            
            newblood = await newblood.save();
            return newblood;
          } catch (error) {
            throw error;
          }
        }
        
    }
