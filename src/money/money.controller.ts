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
    @Role(Roles.DONATORS)
    @Patch("/upload/reciept/:postid")
    @UseInterceptors(FileInterceptor('file'))
    async uploadpaymentrecieptbypostid(
      @Req() req,
      @Param("donationid") donationid: string,
      @UploadedFile() file: Express.Multer.File,
      @Res() res
    ) {
      try {
        const fileBuffer = await fs.promises.readFile(file.path);
        const fileString = fileBuffer.toString();
        const newimage = await this.moneyservice.uploadrecipt(file,donationid,req.user.id)
        
        res.status(200).json({newimage,"info":"reciept for payment has been successfully uploaded, that you so much for the donations"});
      } catch (error) {
        return error;
      }
    }
}