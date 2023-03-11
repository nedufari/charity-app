import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "../user/user.schema";
import { PostDto, UpdateDto } from "./post.dto";
import { PostDocument, Posts } from "./post.schema";
import {Query} from "express-serve-static-core"

@Injectable()
export class PostsService{
    constructor( @InjectModel("Posts") private readonly postModel:Model<Posts> ){}

   async  createPost( post:PostDto,user:User):Promise<Posts>{

    const data= Object.assign(post,{user: user._id}) //the user data 

        const newPost = await  this.postModel.create(data)
        return newPost
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

    


    async updatePost(id:string ,updatedto:UpdateDto):Promise<PostDocument>{
        let existingPost = await this.findone(id)
        existingPost.header = updatedto.header ?? existingPost.header;
        existingPost.caption = updatedto.caption ?? existingPost.caption;
        existingPost.postImage =updatedto.postImage?? existingPost.postImage

        return existingPost.save()


    }

    async deletePost(id:string){
       return await this.postModel.deleteOne({_id:id})
       }
    
}