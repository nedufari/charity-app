import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MoneySchema } from "./money.schema";
import { MoneyService } from "./money.service";
import { MoneyController } from "./money.controller";

@Module({
    imports:[MongooseModule.forFeature([{name:"Money", schema:MoneySchema}])],
    providers:[MoneyService],
    controllers:[MoneyController],
    
})

export class MoneyModule{}