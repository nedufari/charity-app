import { Get, Res } from "@nestjs/common";
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
    @Get('all')
    async findall(@Res()res){
        console.log(this.userservice.getalluser())
        
        return await this.userservice.getalluser()
    }




  
    

  


  

}
