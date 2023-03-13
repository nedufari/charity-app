import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User, UserDocument } from "../user/user.schema";
import { PostDto, UpdateDto } from "./post.dto";
import { PostDocument, Posts } from "./post.schema";
import {Query} from "express-serve-static-core"
import { UserService } from "../user/user.service";
import { CommentService } from "../comment/comment.service";
import { PostCommentDto } from "../comment/comment.dto";

@Injectable()
export class PostsService{
    constructor( @InjectModel("Posts") private readonly postModel:Model<Posts>,private commentservice:CommentService,
    ){}

   async  createPost( userid:string, postdto:PostDto){
    try {
        const newpost = new this.postModel(postdto)
        newpost.author = userid
        return newpost.save()
        
    } catch (error) {
        throw error  
    }

 }


    async findall(query:Query):Promise<PostDocument[]>{

        //pagiation 
        const respage=2
        const currentpage= Number(query.page) || 1
        const skip = respage*(currentpage-1)

        ///searching 
        const keyword = query.keyword ?{
            header:{
                $regex: query.keyword,
                $options:'i'
            }
        }:{}
        return await this.postModel.find({...keyword}).limit(respage).skip(skip).exec()

        
    }


    async findone(id:string):Promise<PostDocument>{
        return await this.postModel.findById(id).populate("author").exec()
    }

    


    async updatePost(postid:string ,updatedto:UpdateDto, userid:string){
        try {
            const foundpost = await this.postModel.findOne({author:userid, _id:postid})
            foundpost.content = updatedto.content || foundpost.content
            return await foundpost.save()
            
        } catch (error) {
            throw error
            
        }
        


    }
    async updateimagebyid(id:string, updatedto:UpdateDto):Promise<PostDocument>{
        let user = await this.findone(id)
        if(!user){
            throw new NotFoundException (`post with ${id} does not exist`)
        }
        user.postImage = updatedto.postImage ?? user.postImage
        return user.save()
    }

    async deletePost(postid:string, userid:string){
        try {
        const findpost = await this.postModel.findById(postid)
        const deletecomment = this.commentservice.deleteCommentsByIds(findpost.comments)
        const deletedpost = await this.postModel.findByIdAndDelete({_id:postid, author:userid})
        return deletedpost
            
        } catch (error) {
            throw error
            
        }
       }

       async addComment(userId: string, postId: string, comment: PostCommentDto) {
        try {
          const foundPost = await this.postModel.findById(postId);
          const newComment = await this.commentservice.postComment(userId, comment);
          let updatedPost = await foundPost.updateOne({
            $push: { comments: newComment.id },
          });
          return newComment;
        } catch (error) {
          throw error;
        }
      }

      async updateComment(userId: string, postId: string, comment: PostCommentDto) {
        try {
          const foundPost = await this.postModel.findById(postId);
          const newComment = await this.commentservice.postComment(userId, comment);
          let updatedPost = await foundPost.updateOne({
            $push: { comments: newComment.id },
          });
          return newComment;
        } catch (error) {
          throw error;
        }
      }

      async deleteComment(commentId: string, userId: string) {
        try {
          const deletedComment = await this.commentservice.deleteComment(
            commentId,
            userId,
          );
          return deletedComment;
        } catch (error) {
          throw error;
        }
      }


    
}