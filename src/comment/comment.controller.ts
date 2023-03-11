import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,Request } from "@nestjs/common";
import { JwtGuard } from "../auth/guard/authguard";
import { Role } from "../auth/guard/role.decorator";
import { RoleGuard } from "../auth/guard/roleguards";
import { Roles } from "../user/roles.enum";
import { PostCommentDto } from "./comment.dto";
import { CommentDcument } from "./comment.schema";
import { CommentService } from "./comment.service";

@Controller("comment")
export class CommentController{
    constructor(private commentservice:CommentService){}

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS,Roles.ADMIN)
    @Post("new")
    postcomment(@Body()commentdto:PostCommentDto, @Request()req){
        console.log(req.user)
        return this.commentservice.comment(commentdto,req.user)}

    
    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS)
    @Patch(":id")
    updatecomment (@Param("id")id:string, @Body()comment:PostCommentDto):Promise<CommentDcument>{
        return this.commentservice.updatecommet(id, comment)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS, Roles.ADMIN)
    @Delete(":id")
    deletecomment(@Param("id")id:string){
        return this.commentservice.deleteComment(id)
    }
}