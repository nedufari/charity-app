import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BloodSchema } from "./blood.schema";


@Module({
    imports:[MongooseModule.forFeature([{name:"Blood", schema:BloodSchema}])],
    providers:[],
    controllers:[],
    exports:[],
})

export class BloodModule{}