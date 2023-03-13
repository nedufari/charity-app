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

    async postComment(userId: string, comment: PostCommentDto) {
        try {
          let newComment = new this.commentmodel(comment);
          newComment.author = userId;
          newComment = await newComment.save();
          return newComment;
        } catch (error) {
          throw error;
        }
      }
    
      async deleteComment(commentId: string, userId: string) {
        try {
          const deletedComment = await this.commentmodel.findOneAndDelete({
            _id: commentId,
            author: userId,
          });
          return deletedComment;
        } catch (error) {
          throw error;
        }
      }
    
      async deleteCommentsByIds(commentIds: any[]) {
        try {
          const deletedComments = await this.commentmodel.deleteMany()
            .where('_id')
            .in(commentIds)
            .exec();
        } catch (error) {
          throw error;
        }
      }
    }