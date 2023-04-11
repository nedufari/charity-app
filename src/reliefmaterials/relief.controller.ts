import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ReliefMaterialService } from "./rellief.service";
import { JwtGuard } from "../auth/guard/authguard";
import { RoleGuard } from "../auth/guard/roleguards";
import { Roles } from "../user/roles.enum";
import { Role } from "../auth/guard/role.decorator";
import { ReliefMaterialDto } from "./relief.dto";

@Controller('relief')
export class ReliefMaterialController{
    constructor(private reliefservice:ReliefMaterialService){}

    @Post('donate/relief/:postid')
    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.DONATORS)
    async makednations(@Param("postid")postid:string, @Req()req,@Body()dto:ReliefMaterialDto){
        return await this.reliefservice.makedonation( dto,req.user._id, postid)
    }

}