import { Get } from "@nestjs/common";
import { Patch } from "@nestjs/common";
import { Controller,Query } from "@nestjs/common";
import { Body, Param } from "@nestjs/common/decorators";
import { UpdateResult } from "typeorm";
import { UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import {Query as ExpressQuery} from "express-serve-static-core"

@Controller("user")

export class UserController{
    constructor(private userservice:UserService){

    }

    @Patch(':id')
    updateUser(@Param("id")id:string, @Body()dto:UpdateUserDto){
        return this.userservice.updateuser(id,dto)
    }

    @Get('fullname')
    searchuser(@Query()query:ExpressQuery){
        return this.userservice.searchuser(query)
    }

    @Get('all')
    findalluser(@Query()query:ExpressQuery){
        return this.userservice.searchuser(query)
    }
}
