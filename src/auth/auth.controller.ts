
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { UserDocument } from "../user/user.schema";
import { AuthService } from "./auth.service";
import { LoginDto, SignupDto } from "./dto/signup.dto";

@Controller("auth")

export class AuthController{
    constructor(private authservice:AuthService){}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)     
    async register(@Body()user:SignupDto,):Promise<UserDocument>{
        try {
            console.log(this.authservice.Register(user))
        
            return  await this.authservice.Register(user)
            
        } catch (error) {
            throw error
            
        }
       
    }

    @Post ("login")
    @HttpCode(HttpStatus.OK)
    async login (@Body()logidto:LoginDto,):Promise<{token :string}>{
        
        return await this.authservice.login(logidto)
    }

    @Post('verify-jwt')
    @HttpCode(HttpStatus.OK)
    verifyJwt(@Body() payload: { jwt: string }) {
        
      return this.authservice.verifyJwt(payload.jwt);
    }
}
