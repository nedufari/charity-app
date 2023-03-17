import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { MoneydonationDto } from "./money.dto";
import { MoneyDocument } from "./money.schema";

@Injectable()
export class MoneyService {
    constructor(@InjectModel("Money") private readonly moneymodel:Model<MoneyDocument>, private cloudinaryservice:CloudinaryService){}

    async donatebmoney(moneydto:MoneydonationDto, userId:string){
        try {
            let money = new this.moneymodel(moneydto);
            money.payer = userId;
            money = await money.save();
            return money;
          } catch (error) {
            throw error;
          }
        }


        async uploadrecipt(file:Express.Multer.File){
            try {
                return await this.cloudinaryservice.uploadimage(file)
                
            } catch (error) {
                throw error
                
            }

        }
        
    }
