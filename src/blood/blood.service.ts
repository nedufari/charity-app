import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BloodDonationDto, bloodResponse } from "./blood.dto";
import { Blood, BloodDocument } from "./blood.schema";

@Injectable()
export class BloodService {
    constructor(@InjectModel("Bloods") private readonly bloodmodel:Model<BloodDocument>){}

    donateblood(blooddto:BloodDonationDto):Promise<BloodDocument>{
        const newblood = new this.bloodmodel(blooddto)
        
        return newblood.save()
        
    }
}