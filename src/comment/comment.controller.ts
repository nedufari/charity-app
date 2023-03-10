import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PostCommentDto } from "./comment.dto";
import { CommentDcument } from "./comment.schema";
import { CommentService } from "./comment.service";

@Controller("comment")
export class CommentController{
    constructor(private commentservice:CommentService){}

    @Post("new")
    postcomment(@Body()commentdto:PostCommentDto){
        return this.commentservice.comment(commentdto)}

    

    @Patch(":id")
    updatecomment (@Param("id")id:string, @Body()comment:PostCommentDto):Promise<CommentDcument>{
        return this.commentservice.updatecommet(id, comment)
    
    }

    @Delete(":id")
    deletecomment(@Param("id")id:string){
        return this.commentservice.deleteComment(id)
    }
}