import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { BloodService } from "./blood.service";
import { JwtGuard } from "../auth/guard/authguard";
import { RoleGuard } from "../auth/guard/roleguards";
import { Role } from "../auth/guard/role.decorator";
import { Roles } from "../user/roles.enum";
import { BloodDonationDto } from "./blood.dto";

@Controller('blood')
export class BloodController{
    constructor(private bloodservice:BloodService){
    }

    @Post('donate/:postid')
    @UseGuards(JwtGuard,RoleGuard)
    @Role(Roles.DONATORS)
    async makeblooddonations(@Body()dto:BloodDonationDto, @Param("postid")postid:string, @Req()req){
        return await this.bloodservice.donateblood(dto,req.user._id, postid)
    }
}