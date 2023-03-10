import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "../Posts/post.schema";
import { UserModule } from "../user/user.module";
import { UserSchema } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./guard/authguard";
import { JwtStrategy } from "./guard/strategy";


@Module({
    imports:[UserModule,MongooseModule.forFeature([{name:"User", schema:UserSchema}]),
    JwtModule.registerAsync({
        useFactory:()=>({
          secret:process.env.KEY,
          signOptions:{expiresIn:'3600s'}
        })
      })],
    providers:[AuthService, UserService,JwtStrategy,JwtGuard],
    controllers:[AuthController],
})
export class AuthModule{}