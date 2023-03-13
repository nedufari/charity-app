import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { query, response, Response } from "express";
import { JwtGuard } from "../auth/guard/authguard";
import { GetUser } from "../user/user.decorator";
import { User } from "../user/user.schema";
import { PostDto,  UpdateDto } from "./post.dto";
import { PostDocument, Posts } from "./post.schema";
import { PostsService } from "./posts.service";
import {Query as ExpressQuery} from "express-serve-static-core"
import { RoleGuard } from "../auth/guard/roleguards";
import { Role } from "../auth/guard/role.decorator";
import { Roles } from "../user/roles.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { join } from "path";
import { UserService } from "../user/user.service";
import { PostCommentDto } from "../comment/comment.dto";

@Controller('posts')
export class PostsController{
    constructor(private postservice:PostsService){}



    ///comment 


    @Post("comment/:postid")
    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS)
    async addComment(@Request()req, @Res()res:Response, @Body()comment:PostCommentDto, @Param("postid")postid:string){
        try {
            const newcomment = await this.postservice.addComment(req.user.id,postid, comment)
            return res.status(200).json(newcomment)
            
        } catch (error) {
            throw error
            
        }
    }


    @Patch("comment/:postid")
    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.DONATORS)
    async updateComment(@Request()req, @Res()res:Response, @Body()comment:PostCommentDto, @Param("postid")postid:string){
        try {
            const newcomment = await this.postservice.updateComment(req.user.id,postid, comment)
            return res.status(200).json(newcomment)
            
        } catch (error) {
            throw error
            
        }
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.ADMIN,Roles.AGENCY,Roles.DONATORS)
    @Delete("delete/:commentid")
    async deleteComment(
        @Res() res: Response,
        @Request() req,
        @Param('commentId') commentId: string,
      ) {
        try {
          const deletedComment = await this.postservice.deleteComment(
            commentId,
            req.user.id,
          );
          res.status(204).json(deletedComment);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }



    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY, Roles.ADMIN)
    @Post('new')
    async createPost(@Body() post: PostDto, @Res() res:Response, @Request()req){
        try {
            const newpost = await this.postservice.createPost(req.user.id,post )
            res.status(201).json(newpost)
        }catch(error){
            res.status(500).json({message:error.message})
        }
        
      }


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY)
    @Get('header')
    async finfAll(@Query()query:ExpressQuery):Promise<PostDocument[]>{
        return await this.postservice.findall(query)
    }


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY)
    @Get(':id')
    async finone(@Param("id")id:string):Promise<PostDocument>{
        return await this.postservice.findone(id)
    }


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY)
    @Patch(':id')
    async updatePost(@Body() post: PostDto, @Res() res:Response, @Request()req, @Param("postid")postid:string){
        try {
            const newpost = await this.postservice.updatePost(postid,post,req.user.id )
            res.status(201).json(newpost)
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

    
     




      ////comment session


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY,Roles.ADMIN)
    @Post("/upload")
    @UseInterceptors(FileInterceptor('image',{storage:diskStorage({
        destination: "./images",
        filename:(req, file,callback)=> {
            const extension :string= path.extname(file.originalname)
            const fileName :string= uuidv4()+ extension 
            
            callback(null, `${fileName}${extension}`)
        }
        
    })}))
    uploadfile(@Request()req, @UploadedFile()file:Express.Multer.File):Promise<PostDocument>{
        const updateDto = new UpdateDto();
        updateDto.postImage = file.filename; // set the postImage property to the filename of the uploaded file
        return this.postservice.updateimagebyid(req.user._id, updateDto);

    }


}