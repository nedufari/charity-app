import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReliefMaterialDto } from "./relief.dto";
import { ReliefMaterialDocument } from "./relief.schema";

@Injectable()
export class ReliefMaterialService{
    constructor(@InjectModel("ReliefMaterial") private readonly reliefmodel:Model<ReliefMaterialDocument>){}

    async makedonation(reliedmaterialdto:ReliefMaterialDto, userid){
        try {
            let reliefmaterial = new this.reliefmodel(reliedmaterialdto)
            reliefmaterial.donor=userid
            reliefmaterial= await  reliefmaterial.save()
            return reliefmaterial;
            
        } catch (error) {
            return error
            
        }
       
    }
    
}