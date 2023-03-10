import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReliefMaterialSchema } from "./relief.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:"ReliefMaterial", schema:ReliefMaterialSchema}])],
    providers:[],
    controllers:[],
    exports:[],
})

export class ReliefMaterialModule{}