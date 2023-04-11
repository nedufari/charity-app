import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Request, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { query, response, Response } from "express";
import { JwtGuard } from "../auth/guard/authguard";
import { PostDto,  UpdateDto } from "./post.dto";
import { PostDocument, Posts } from "./post.schema";
import { PostsService } from "./posts.service";
import {Query as ExpressQuery} from "express-serve-static-core"
import { RoleGuard } from "../auth/guard/roleguards";
import { Role } from "../auth/guard/role.decorator";
import { Roles } from "../user/roles.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { PostCommentDto } from "../comment/comment.dto";
import * as fs from 'fs';


@Controller('posts')
export class PostsController{
    constructor(private postservice:PostsService){}



    ///comment 


    @Post("comment/:postid")
    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS)
    async addComment(@Request()req, @Res()res:Response, @Body()comment:PostCommentDto, @Param("postid")postid:string){
        try {
            const newcomment = await this.postservice.addComment(req.user._id,postid, comment)
            
            return res.status(200).json(newcomment)
            
        } catch (error) {
            throw error
            
        }
    }

    @Get("comment/all")
    async finadallcomment(){
      return await this.postservice.findallcomment()
    }


    // @Patch("comment/:postid")
    // @UseGuards(JwtGuard,RoleGuard)
    // @Role(Roles.AGENCY,Roles.DONATORS)
    // async updateComment(@Request()req, @Res()res:Response, @Body()comment:PostCommentDto, @Param("postid")postid:string){
    //     try {
    //         const newcomment = await this.postservice.updateComment(req.user.id,postid, comment)
            
    //         return res.status(200).json(newcomment)
            
    //     } catch (error) {
    //         throw error
            
    //     }
    // }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.ADMIN,Roles.AGENCY,Roles.DONATORS)
    @Delete("delete/:commentid")
    async deleteComment(
        @Res() res: Response,
        @Request() req,
        @Param('commentId') commentId: string,
        @Param('postId') postId: string,

      ) {
        try {
          const deletedComment = await this.postservice.deleteComment(
            commentId,
            req.user.id,
            postId
          );
          
          res.status(204).json(deletedComment);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }



    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY, Roles.ADMIN, Roles.DONATORS)
    @Post('new')
    async createPost(@Body() post: PostDto, @Res() res:Response, @Request()req:any){
        try {
            const user = req.user; 
            const newpost = await this.postservice.createPost(post,user._id )
            
            res.status(201).json(newpost)
        }catch(error){
            res.status(500).json({message:error.message})
        }
        
      }


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY)
    @Get('header')
    async finfAll(@Query()query:ExpressQuery,@Res()res:Response):Promise<PostDocument[]>{
      
        return await this.postservice.findall(query)
    }


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS)
    @Get(':id')
    async finone(@Param("id")id:string, @Res()res:Response):Promise<PostDocument>{
      console.log(this.postservice.findone(id))
       
        return await this.postservice.findone(id)
    }


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS)
    @Patch(':id')
    updatePost(@Body() post: PostDto, @Res() res:Response, @Request()req, @Param("postid")postid:string){
        try {
            const newpost =  this.postservice.updatePost(postid,post,req.user.id )
            return newpost
            
            
        }catch(error){
            res.status(500).json({message:error.message})
        }
        
      }


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY)
    @Delete(":postid")
    async deletePost(
        @Res() res: Response,@Request() req,@Param('postId') postId: string,) {
        try {
          const newPost = await this.postservice.deletePost(postId, req.user.id);
          
          res.status(200).json(newPost);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

     


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY, Roles.ADMIN)
    @Patch("/upload/:postid")
    @UseInterceptors(FileInterceptor('file'))
    async uploadimagebypostid(
      @Req() req,
      @Param("postid") postid: string,
      @UploadedFile() file: Express.Multer.File,
      @Res() res
    ) {
      try {
        const fileBuffer = await fs.promises.readFile(file.path);
        const fileString = fileBuffer.toString();
        const newimage = await this.postservice.updateimagebypostid(
          fileString,
          req.user.id,
          postid
        );
       
        res.status(200).json(newimage);
      } catch (error) {
        return error;
      }
    }


    
  




    
   


    
  

   
        

}