import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "../user/user.schema";
import { PostCommentDto } from "./comment.dto";
import { CommentDcument } from "./comment.schema";
import { Posts } from "../Posts/post.schema";

@Injectable()
export class CommentService{
    constructor(@InjectModel("Comment")private readonly commentmodel:Model<CommentDcument>){

    }

    async postComment(author: User, postId: string, comment: PostCommentDto) {
      try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
          throw new Error('Invalid postId');
        }
    
        let newComment = new this.commentmodel({
          ...comment,
          author,
          postID: new mongoose.Types.ObjectId(postId),
        });
    
        return await newComment.save();
      } catch (error) {
        throw error;
      }
    }


      async deleteComment(commentId: string, userId: string, postid:string) {
        try {
          const deletedComment = await this.commentmodel.findOneAndDelete({
            _id: commentId,
            author: userId,
            postID:postid
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

      async findallcommet(){
        return await this.commentmodel.find().exec()
      }
    }