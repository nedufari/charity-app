import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BloodDonationDto, bloodResponse } from "./blood.dto";
import { Blood, BloodDocument } from "./blood.schema";

@Injectable()
export class BloodService {
    constructor(@InjectModel("Blood") private readonly bloodmodel:Model<BloodDocument>){}

    async donateblood(blooddto:BloodDonationDto, userId:string){
        try {
            let newblood = new this.bloodmodel(blooddto);
            newblood.donor = userId;
            newblood = await newblood.save();
            return newblood;
          } catch (error) {
            throw error;
          }
        }
        
    }
