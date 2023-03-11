import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { query } from "express";
import { JwtGuard } from "../auth/guard/authguard";
import { GetUser } from "../user/user.decorator";
import { User } from "../user/user.schema";
import { PostDto, UpdateDto } from "./post.dto";
import { PostDocument, Posts } from "./post.schema";
import { PostsService } from "./posts.service";
import {Query as ExpressQuery} from "express-serve-static-core"
import { RoleGuard } from "../auth/guard/roleguards";
import { Role } from "../auth/guard/role.decorator";
import { Roles } from "../user/roles.enum";

@Controller('posts')
export class PostsController{
    constructor(private postservice:PostsService){}


    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY, Roles.ADMIN)
    @Post('new')
    async createProduct(@Body() postdto:PostDto,@Request()req):Promise<Posts>{
        console.log(req.user)
            return await this.postservice.createPost(postdto, req.user)  
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
    async updateProduct(
        @Param('id')id:string,@Body() updatedto:UpdateDto):Promise<PostDocument>{
            return await this.postservice.updatePost(id,updatedto)
        }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY)
    @Delete(":id")
    async deletePost(@Param("id")id:string){
        return await this.postservice.deletePost(id)

    }

}