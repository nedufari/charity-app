
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { UserDetails } from "../user/user.interface";
import { UserDocument } from "../user/user.schema";
import { AuthService } from "./auth.service";
import { LoginDto, SignupDto } from "./dto/signup.dto";

@Controller("auth")

export class AuthController{
    constructor(private authservice:AuthService){}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    register(@Body()user:SignupDto, @Res()res):Promise<UserDocument>|null{
        res.header('Access-Control-Allow-Origin', '*');
        return this.authservice.Register(user)
    }

    @Post ("login")
    @HttpCode(HttpStatus.OK)
    login (@Body()logidto:LoginDto,@Res()res):Promise<{token :string}>{
        res.header('Access-Control-Allow-Origin', '*');
        return this.authservice.login(logidto)
    }

    @Post('verify-jwt')
    @HttpCode(HttpStatus.OK)
    verifyJwt(@Body() payload: { jwt: string },@Res()res) {
        res.header('Access-Control-Allow-Origin', '*');
      return this.authservice.verifyJwt(payload.jwt);
    }
}
