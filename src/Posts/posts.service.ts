import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { PostDto, UpdateDto } from './post.dto';
import { PostDocument, Posts } from './post.schema';
import { Query } from 'express-serve-static-core';
import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';
import { PostCommentDto } from '../comment/comment.dto';
import { extname, join } from 'path';
import * as fileType from 'file-type';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import multer, { diskStorage } from 'multer';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Posts') private readonly postModel: Model<Posts>,
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
    private commentservice: CommentService,
    
  ) {}

  async createPost(createPostDto: PostDto, author: User): Promise<Posts> {
    try {
      const createdPost = new this.postModel({
        ...createPostDto,
        author,
      });
      return createdPost.save();
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

  async updatePhoto(postId: string, filename: string): Promise<Posts> {
    if (!postId) {
      throw new Error(`Post ID is missing`);
    }
  
    const post = await this.postModel.findById(postId);
  
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`);
    }

    const photoUrl =`https://charity-app.up.railway.app/public/${filename}`
  
    post.postImage = photoUrl;
    return post.save();
  }
  
  




  async fetchAllPost(page = 1, limit = 10): Promise<PostDocument[]> {
    const skip = (page - 1) * limit;
    console.log("before find() method")
    const posts = await this.postModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
      console.log("after find()method")
      return posts
  }
  






  async findall(query: Query): Promise<PostDocument[]> {
    //pagiation
    const respage = 2;
    const currentpage = Number(query.page) || 1;
    const skip = respage * (currentpage - 1);

    ///searching
    const keyword = query.keyword
      ? {
          header: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    return await this.postModel
      .find({ ...keyword })
      .limit(respage)
      .skip(skip)
      .exec();
  }

  async fetchonePost(id:string): Promise<PostDocument> {
    const post = await this.postModel
    .findOne({_id:id})
    return post
      
  }

  updatePost(postid: string, updatedto: UpdateDto, userid: User) {
    try {
      const updatedpost = this.postModel.findByIdAndUpdate(
        postid,
        userid,
        updatedto,
      );
      //if (!updatedpost) throw new HttpException('details not found',HttpStatus.BAD_REQUEST)
      return updatedpost;
    } catch (error) {
      throw error;
    }
  }

// post.service.ts

async deletePost(id: string) {
  const post = await this.postModel.findById(id);
  if (!post) {
    throw new NotFoundException(`Post with ID ${id} not found`);
  }
  await this.commentModel.deleteMany({ post: post._id });
  return await post.deleteOne();
}




  async addComment(author: User, postId: string, commentdto: PostCommentDto) {
    try {
      const makecomment = await this.postModel.find({
        ...commentdto,
        author,
        postId,
      });
      const newComment = await this.commentservice.postComment(
        author,
        postId,
        commentdto,
      );
      return newComment;
    } catch (error) {
      throw error;
    }
  }

  async updateComment( commentid: string, comment: PostCommentDto) {
    try {
     
      const commentupdate= await this.commentservice.updatecomment(commentid,comment)
      return commentupdate
     
      
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(commentId: string, userId: string, postId: string) {
    try {
      const deletedComment = await this.commentservice.deleteComment(
        commentId,
        userId,
        postId,
      );
      return deletedComment;
    } catch (error) {
      throw error;
    }
  }

  async findallcomment() {
    return await this.commentservice.findallcommet();
  }
}
