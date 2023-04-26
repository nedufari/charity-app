import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { MoneydonationDto } from './money.dto';
import { Money, MoneyDocument } from './money.schema';
import { User } from '../user/user.schema';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as fileType from 'file-type';

@Injectable()
export class MoneyService {
  constructor(
    @InjectModel('Money') private readonly moneymodel: Model<MoneyDocument>,

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

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const extension = extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      throw new BadRequestException(
        'Only images with the following extensions are allowed: ' +
          allowedExtensions.join(', '),
      );
    }

    const fileInfo = await fileType.fromBuffer(file.buffer);

    if (!fileInfo || !fileInfo.mime.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }

    const filename = uuidv4() + extension;
    const filePath = `public/${filename}`;

    const writeStream = fs.createWriteStream(filePath);
    writeStream.write(file.buffer);
    writeStream.end();

    return filename;
  }

  async updatePhoto(donationId: string, filename: string): Promise<Money> {
    if (!donationId) {
      throw new Error(`Post ID is missing`);
    }
  
    const post = await this.moneymodel.findById(donationId);
  
    if (!post) {
      throw new Error(`Post with ID ${donationId} not found`);
    }
    const photoUrl =`https://charity-app.up.railway.app/public/${filename}`
  
    post.reciept = photoUrl;
    return post.save();
  }
  
}


