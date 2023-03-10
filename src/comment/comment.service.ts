import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostCommentDto } from "./comment.dto";
import { CommentDcument } from "./comment.schema";

@Injectable()
export class CommentService{
    constructor(@InjectModel("Comment")private readonly commentmodel:Model<CommentDcument>){

    }

    comment (commentdto:PostCommentDto ):Promise <CommentDcument>{
        const newComment = new this.commentmodel(commentdto)
        return newComment.save()
    }


    // findallcomment():Promise<CommentDcument[]>{
    //     return this.commentmodel.find().exec()
    // }

    findallcommentbyid(id:string):Promise<CommentDcument>{
        return this.commentmodel.findById(id).exec()
    }

    

   async updatecommet(id:string, newcomment:PostCommentDto):Promise<CommentDcument>{
        const existingComment = await  this.findallcommentbyid(id)
        existingComment.comment= newcomment.comment ?? existingComment.comment
        return existingComment.save()
    }

   

    async deleteComment(id:string){
        return await this.commentmodel.deleteOne({_id:id})
    }


}

