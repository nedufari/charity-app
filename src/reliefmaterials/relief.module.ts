import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReliefMaterialSchema } from "./relief.schema";
import { ReliefMaterialService } from "./rellief.service";

@Module({
    imports:[MongooseModule.forFeature([{name:"ReliefMaterial", schema:ReliefMaterialSchema}])],
    providers:[ReliefMaterialService],
    controllers:[],
    exports:[ReliefMaterialService],
})

export class ReliefMaterialModule{}