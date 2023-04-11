import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BloodSchema } from "./blood.schema";
import { BloodService } from "./blood.service";
import { BloodController } from "./blood.controller";


@Module({
    imports:[MongooseModule.forFeature([{name:"Blood", schema:BloodSchema}])],
    providers:[BloodService],
    controllers:[BloodController],
    
    
})

export class BloodModule{}