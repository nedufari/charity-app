import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ReplyDto } from "./reply.dto";

import { ReplyDocument } from "./reply.schema";
import { ReplyService } from "./reply.service";

@Controller("comment")
export class ReplyController{
    constructor(private replyservice:ReplyService){}

    @Post("new")
    postreply(@Body()reply:ReplyDto){
        return this.replyservice.reply(reply)
        
    }

    @Get('all')
    findallreplyt():Promise<ReplyDocument[]>{
        return this. replyservice.findallreply()

    }

    @Patch(":id")
    updatereply (@Param("id")id:string, @Body()reply:ReplyDto):Promise<ReplyDocument>{
        return this.replyservice.updateReply(id, reply)
    
    }

    @Delete(":id")
    deletereply(@Param("id")id:string){
        return this.replyservice.deleteReply(id)
    }
}