import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BloodController } from "./blood.controller";
import { BloodSchema } from "./blood.schema";
import { BloodService } from "./blood.service";


@Module({
    imports:[MongooseModule.forFeature([{name:"Bloods", schema:BloodSchema}])],
    providers:[BloodService],
    controllers:[BloodController],
    exports:[],
})

export class BloodModule{}