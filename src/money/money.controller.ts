import { Body, Controller, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { MoneyService } from "./money.service";
import { JwtGuard } from "../auth/guard/authguard";
import { RoleGuard } from "../auth/guard/roleguards";
import { Role } from "../auth/guard/role.decorator";
import { Roles } from "../user/roles.enum";
import { MoneydonationDto } from "./money.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from 'fs';

@Controller('money')
export class MoneyController{
    constructor(private moneyservice:MoneyService){}

    @Post('donate/money/:postid')
    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.DONATORS)
    async moneydonation(@Body()dto:MoneydonationDto, @Param("postid")postid:string, @Req()req,){
        return await this.moneyservice.donatebmoney(dto,req.user._id,postid)

    }

   
    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.DONATORS,)
    @Patch("/upload/:donationid")
    @UseInterceptors(FileInterceptor('file'))
    async updatePostPhoto(
      @Param('donationid') donationid: string,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<void> {
      const filename = await this.moneyservice.uploadFile(file);
      await this.moneyservice.updatePhoto(donationid, filename);
    }
}