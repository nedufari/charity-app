import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard/authguard";
import { Role } from "../auth/guard/role.decorator";
import { RoleGuard } from "../auth/guard/roleguards";
import { Roles } from "../user/roles.enum";
import { ReplyDto } from "./reply.dto";

import { ReplyDocument } from "./reply.schema";
import { ReplyService } from "./reply.service";

@Controller("comment")
export class ReplyController{
    constructor(private replyservice:ReplyService){}

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS)
    @Post("new")
    postreply(@Body()reply:ReplyDto){
        return this.replyservice.reply(reply)
        
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.ADMIN)
    @Get('all')
    findallreplyt():Promise<ReplyDocument[]>{
        return this. replyservice.findallreply()

    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS)
    @Patch(":id")
    updatereply (@Param("id")id:string, @Body()reply:ReplyDto):Promise<ReplyDocument>{
        return this.replyservice.updateReply(id, reply)
    
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS,Roles.ADMIN)
    @Delete(":id")
    deletereply(@Param("id")id:string){
        return this.replyservice.deleteReply(id)
    }
}