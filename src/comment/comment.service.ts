import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

      async findallcommet():Promise<CommentDcument[]>{
        return await this.commentmodel.find()
      }

      async updatecomment(id: string, dto: PostCommentDto) {
   
        let comment = await this.commentmodel.findByIdAndUpdate(id, dto, { new: true });
        if (!comment) throw new HttpException('comment not found', HttpStatus.NOT_FOUND);
        return comment.save();
      }
    }