import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MoneySchema } from "./money.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:"Money", schema:MoneySchema}])],
    providers:[],
    controllers:[],
    exports:[],
})

export class MoneyModule{}