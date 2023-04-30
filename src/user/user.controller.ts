import { Delete, Get, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Patch } from "@nestjs/common";
import { Controller,Query } from "@nestjs/common";
import { Body, Param } from "@nestjs/common";
import { UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import {Query as ExpressQuery} from "express-serve-static-core"
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard/authguard";
import { Role } from "../auth/guard/role.decorator";
import { RoleGuard } from "../auth/guard/roleguards";
import { Roles } from "./roles.enum";
import { User, UserDocument } from "./user.schema";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("user")

export class UserController{
    constructor(private userservice:UserService){

    }

    @UseGuards(JwtGuard)
    @Role(Roles.AGENCY, Roles.DONATORS)
    @Patch(':id')
    async updateUser(@Param("id")id:string, @Body()dto:UpdateUserDto):Promise<UserDocument>{
       
        return await this.userservice.updateuser(id,dto)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.ADMIN)
    @Get('fullname')
    searchuser(@Query()query:ExpressQuery,@Res()res){
        
        return this.userservice.searchuser(query)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.ADMIN)
    @Get('email')
    findalluser(@Query()query:ExpressQuery,@Res()res){
        
        return this.userservice.searchuserbyemail(query)
    }

    // @UseGuards(JwtGuard)
    //@Role(Roles.ADMIN)
    @Get("all")
      async getAllUsers(@Query('page') page: number, @Query('limit') limit: number): Promise<UserDocument[]> {
        const posts = await this.userservice.fetchAlluser(page, limit);
        return posts
      }

      @Get("one/:id")
      async getAllPosts(@Param("id")id:string): Promise<UserDocument> {
        const posts = await this.userservice.fetchsingleuser(id);
        return posts
      }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.ADMIN)
    @Delete("deleteuser/:id")
    async deleteuser(@Param('id')id:string){
        return await this.userservice.deleteuser(id) 
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.DONATORS,Roles.AGENCY,Roles.ADMIN)
    @Patch("/upload/:id")
    @UseInterceptors(FileInterceptor('file'))
    async updatePostPhoto(
      @Param('id') id: string,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<void> {
      const filename = await this.userservice.uploadFile(file);
      await this.userservice.updatePhoto(id, filename);
    }

   
    @Delete(":id")
    async delete(@Param("id")id:string,){
        return await this.userservice.deleteuser(id)

    }



  
    

  


  

}
