import { Body, Controller, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ReliefMaterialService } from "./rellief.service";
import { JwtGuard } from "../auth/guard/authguard";
import { RoleGuard } from "../auth/guard/roleguards";
import { Roles } from "../user/roles.enum";
import { Role } from "../auth/guard/role.decorator";
import { ReliefMaterialDto } from "./relief.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('relief')
export class ReliefMaterialController{
    constructor(private reliefservice:ReliefMaterialService){}

    @Post('donate/:postid')
    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.DONATORS)
    async makednations(@Param("postid")postid:string, @Req()req,@Body()dto:ReliefMaterialDto){
        return await this.reliefservice.makedonation( dto,req.user._id, postid)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.DONATORS,)
    @Patch("/upload/:reliefid")
    @UseInterceptors(FileInterceptor('file'))
    async updatePostPhoto(
      @Param('reliefid') reliefid: string,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<void> {
      const filename = await this.reliefservice.uploadFile(file);
      await this.reliefservice.updatePhoto(reliefid, filename);
    }

}