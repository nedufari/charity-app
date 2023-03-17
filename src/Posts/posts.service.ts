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
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { MoneydonationDto } from "../money/money.dto";
import { MoneyService } from "../money/money.service";
import { BloodService } from "../blood/blood.service";
import { BloodDonationDto } from "../blood/blood.dto";
import { ReliefMaterialDto } from "../reliefmaterials/relief.dto";
import { ReliefMaterialService } from "../reliefmaterials/rellief.service";

@Injectable()
export class PostsService{
    constructor( @InjectModel("Posts") private readonly postModel:Model<Posts>,
    private commentservice:CommentService, 
    private cloudiaryservice:CloudinaryService,
    private money:MoneyService,
    private blood:BloodService,
    private reliefmaterial:ReliefMaterialService,
    private userservice:UserService
    
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

 async updateimagebypostid(postid: string, fileString: Express.Multer.File, userid: string) {
  try {
    const updatepostimage = await this.postModel.findOneAndUpdate({ author: userid, _id: postid });
    return await this.cloudiaryservice.uploadimage(fileString);
  } catch (error) {
    return error;
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
            // if (updatedto.postImage && foundpost.postImage !== updatedto.postImage ){
            //   foundpost.postImage=(await this.cloudiaryservice.convertImageToCloudiary(updatedto.postImage)).url
            // }
            return await foundpost.save()
            
        } catch (error) {
            throw error
            
        }
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
          const foundPost = await this.postModel.find({id:postId});
          const newComment = await this.commentservice.postComment(userId, comment);
        //   let updatedPost = await foundPost.updateOne({
        //     $push: { comments: newComment.id },
        //   });
          return newComment;
        } catch (error) {
          throw error;
        }
      }

      async updateComment(userId: string, postId: string, comment: PostCommentDto) {
        try {
          const foundPost = await this.postModel.find({id:postId});
          const newComment = await this.commentservice.postComment(userId, comment);
        //   let updatedPost = await foundPost.updateOne({
        //     $push: { comments: newComment.id },
        //   });
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

      async makemoeydonations(dto:MoneydonationDto, postid:string, userid:string){
        try {
          const findpost= this.postModel.find({id:postid})
          const makedonations= await this.money.donatebmoney(dto,userid)
          const agency = await this.userservice.finduserByid(userid)
          const bank= agency.bankName
          const account1 = agency.account1
          const accountName = agency.accountName

          return {
            makedonations,
            bank,
            account1,
            accountName
          
          }

          
        } catch (error) {
          return error
          
        }
  
      }

      async recieptforpayment(filestring:Express.Multer.File, userid:string, postid:string){
        try {
        const findpost=await this.postModel.findOneAndUpdate({_id:postid, author:userid})
        const uploadreciept= await this.money.uploadrecipt(filestring)
        return uploadreciept
          
        } catch (error) {
          return error
          
        }
        
      }

      async blooddonatio(dto:BloodDonationDto, postid:string, userid:string){
        try {
          const findpost = this.postModel.find({id:postid})
          const newdonation = await this.blood.donateblood(dto, userid)
          return newdonation
          
        } catch (error) {
          return error
          
        }
      }

      async reliefmatrialdonations(dto:ReliefMaterialDto, postid:string,userid:string){
        try {
          const findpost= this.postModel.find({id:postid})
          const makedonation  = await this.reliefmaterial.makedonation(dto, userid)
          return makedonation

          
        } catch (error) {
          return error
          
        }
      }


    
}