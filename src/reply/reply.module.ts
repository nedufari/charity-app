import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";


import { ReplyController } from "./reply.controller";
import { ReplySchema } from "./reply.schema";
import { ReplyService } from "./reply.service";

@Module({
    imports:[MongooseModule.forFeature([{name:"Reply", schema:ReplySchema}])],
    providers:[ReplyService],
    controllers:[ReplyController]
})

export class ReplyModule{}