import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BloodSchema } from "./blood.schema";
import { BloodService } from "./blood.service";


@Module({
    imports:[MongooseModule.forFeature([{name:"Bloods", schema:BloodSchema}])],
    providers:[BloodService],
    
    exports:[BloodService],
})

export class BloodModule{}