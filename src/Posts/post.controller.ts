import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { query } from "express";
import { JwtGuard } from "../auth/guard/authguard";
import { GetUser } from "../user/user.decorator";
import { User } from "../user/user.schema";
import { PostDto, UpdateDto } from "./post.dto";
import { PostDocument, Posts } from "./post.schema";
import { PostsService } from "./posts.service";
import {Query as ExpressQuery} from "express-serve-static-core"

@Controller('posts')
export class PostsController{
    constructor(private postservice:PostsService){}

    @Post('new')
    // @UseGuards(JwtGuard)
    async createProduct(
        // @GetUser()user:User,
        @Body() postdto:PostDto,):Promise<Posts>{
            // console.log(user)
                
            return await this.postservice.createPost(postdto)
        }

    @Get('all')
    async finfAll(@Query()query:ExpressQuery):Promise<PostDocument[]>{
        return await this.postservice.findall(query)
    }

    @Get(':id')
    async finone(@Param("id")id:string):Promise<PostDocument>{
        return await this.postservice.findone(id)
    }

    @Patch(':id')
    async updateProduct(
        @Param('id')id:string,@Body("header") updatedto:UpdateDto):Promise<PostDocument>{
            return await this.postservice.updatePost(id,updatedto)
        }

    @Delete(":id")
    async deletePost(@Param("id")id:string){
        return await this.postservice.deletePost(id)

    }

}