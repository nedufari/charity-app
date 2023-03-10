import { Module } from '@nestjs/common';


import { PostsModule } from './Posts/post.module';
import {MongooseModule} from "@nestjs/mongoose"
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';
import { BloodModule } from './blood/blood.module';
import { ReliefMaterialModule } from './reliefmaterials/relief.module';
import { MoneyModule } from './money/money.module';
import {ConfigModule}  from  "@nestjs/config"



@Module({
  imports: [PostsModule, UserModule,AuthModule,CommentModule,ReplyModule,BloodModule,ReliefMaterialModule,MoneyModule,ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot("mongodb://localhost:27017/olisa")],
  
})
export class AppModule {}


//in mogo we use object document mapper (odm) because it is not a relational database while relational uses orm (object relationals mapper)