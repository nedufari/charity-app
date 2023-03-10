import { IsOptional, IsString } from "class-validator";

export class ReplyDto{
    @IsString()
    @IsOptional()
    reply:string

}