
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserDetails } from "../user/user.interface";
import { UserDocument } from "../user/user.schema";
import { AuthService } from "./auth.service";
import { LoginDto, SignupDto } from "./dto/signup.dto";

@Controller("auth")

export class AuthController{
    constructor(private authservice:AuthService){}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    register(@Body()user:SignupDto):Promise<UserDocument>|null{
        return this.authservice.Register(user)
    }

    @Post ("login")
    @HttpCode(HttpStatus.OK)
    login (@Body()logidto:LoginDto):Promise<{token :string}>{
        return this.authservice.login(logidto)
    }

    @Post('verify-jwt')
    @HttpCode(HttpStatus.OK)
    verifyJwt(@Body() payload: { jwt: string }) {
      return this.authservice.verifyJwt(payload.jwt);
    }
}
