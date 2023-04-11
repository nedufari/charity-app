import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { MoneydonationDto } from './money.dto';
import { MoneyDocument } from './money.schema';
import { User } from '../user/user.schema';

@Injectable()
export class MoneyService {
  constructor(
    @InjectModel('Money') private readonly moneymodel: Model<MoneyDocument>,
    private cloudinaryservice: CloudinaryService,
  ) {}

  async donatebmoney(moneydto: MoneydonationDto, userId: User, postid: string) {
    try {
      let money = new this.moneymodel({
        ...moneydto,
        payer: userId,
        postID: new mongoose.Types.ObjectId(postid),
      });

      return await money.save();
    } catch (error) {
      throw error;
    }
  }

  async uploadrecipt(file: Express.Multer.File,donationid:string, donor:User) {
    try {
        const checkuser= await this.moneymodel.find({payer:donor}).exec()
        const checkdonationid=await this.moneymodel.find({_id:donationid})
        if (!checkuser && !checkdonationid) throw new HttpException('records do not match',HttpStatus.BAD_REQUEST)
      return await this.cloudinaryservice.uploadimage(file);
    } catch (error) {
      throw error;
    }
  }
}
