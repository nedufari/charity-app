import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../user/user.schema";
import { PostCommentDto } from "./comment.dto";
import { CommentDcument } from "./comment.schema";

@Injectable()
export class CommentService{
    constructor(@InjectModel("Comment")private readonly commentmodel:Model<CommentDcument>){

    }

    comment (commentdto:PostCommentDto, user:User ):Promise <CommentDcument>{

        const data= Object.assign(commentdto,{user: user._id}) //the user dat
        const newComment =  this.commentmodel.create(data)
        return newComment
    }


    // findallcomment():Promise<CommentDcument[]>{
    //     return this.commentmodel.find().exec()
    // }

    findallcommentbyid(id:string):Promise<CommentDcument>{
        return this.commentmodel.findById(id).populate("author").exec()
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

