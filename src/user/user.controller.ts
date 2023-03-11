import { Get } from "@nestjs/common";
import { Patch } from "@nestjs/common";
import { Controller,Query } from "@nestjs/common";
import { Body, Param, UseInterceptors } from "@nestjs/common";
import { UpdateResult } from "typeorm";
import { UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import {Query as ExpressQuery} from "express-serve-static-core"
import { Post } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFile } from "@nestjs/common/decorators";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import { join } from "path";
import { Observable, of, switchMap } from "rxjs";
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard/authguard";
import { Role } from "../auth/guard/role.decorator";
import { RoleGuard } from "../auth/guard/roleguards";
import { Roles } from "./roles.enum";

@Controller("user")

export class UserController{
    constructor(private userservice:UserService){

    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.AGENCY, Roles.DONATORS)
    @Patch(':id')
    updateUser(@Param("id")id:string, @Body()dto:UpdateUserDto){
        return this.userservice.updateuser(id,dto)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.ADMIN)

    @Get('fullname')
    searchuser(@Query()query:ExpressQuery){
        return this.userservice.searchuser(query)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.ADMIN)
    @Get('email')
    findalluser(@Query()query:ExpressQuery){
        return this.userservice.searchuserbyemail(query)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.ADMIN)
    @Get('all')
    findall(){
        return this.userservice.getalluser()
    }


  
    

  


  

}
