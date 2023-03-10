import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReplyDto } from "./reply.dto";
import { ReplyDocument } from "./reply.schema";

@Injectable()
export class ReplyService{
    constructor(@InjectModel("Reply")private readonly replymodel:Model<ReplyDocument>){

    }

    

    reply(reply:ReplyDto):Promise<ReplyDocument>{
        const newReply = new this.replymodel(reply)
        return newReply.save()
    }

    

    findallreply():Promise<ReplyDocument[]>{
        return this.replymodel.find().exec()
    }

    findallreplybyid(id:string):Promise<ReplyDocument>{
        return this.replymodel.findById(id).exec()
    }

  
    

    async updateReply(id:string, newreply:ReplyDto):Promise<ReplyDocument>{
        const existingReply = await  this.findallreplybyid(id)
        existingReply.reply = newreply.reply ?? existingReply.reply
        return existingReply.save()
    }

   

    async deleteReply(id:string){
        return await this.replymodel.deleteOne({_id:id})
    }
}

