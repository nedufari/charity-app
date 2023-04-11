import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CloudiaryModule } from "../cloudinary/cloudinary.module";
import { MoneySchema } from "./money.schema";
import { MoneyService } from "./money.service";
import { MoneyController } from "./money.controller";

@Module({
    imports:[MongooseModule.forFeature([{name:"Money", schema:MoneySchema}]),CloudiaryModule],
    providers:[MoneyService],
    controllers:[MoneyController],
    
})

export class MoneyModule{}