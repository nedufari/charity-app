import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { PostDto, UpdateDto } from './post.dto';
import { PostDocument, Posts } from './post.schema';
import { Query } from 'express-serve-static-core';
import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';
import { PostCommentDto } from '../comment/comment.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Posts') private readonly postModel: Model<Posts>,
    private commentservice: CommentService,
    private cloudiaryservice: CloudinaryService,
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

  async updateimagebypostid(
    postid: string,
    fileString: Express.Multer.File,
    userid: string,
  ) {
    try {
      const updatepostimage = await this.postModel.findOneAndUpdate({
        author: userid,
        _id: postid,
      });
      return await this.cloudiaryservice.uploadimage(fileString);
    } catch (error) {
      return error;
    }
  }

  async fetchallpost():Promise<PostDocument[]>{
    return await this.postModel.find({})
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

  async findone(id: string): Promise<PostDocument> {
    return await this.postModel
      .findById(id)
      .populate([
        'author',
        'comments',
        'blooddonations',
        'moneydonations',
        'reliefmaterialdonations',
      ])
      .exec();
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

  async deletePost(postid: string, userid: string) {
    try {
      const findpost = await this.postModel.findById(postid);
      const deletecomment = this.commentservice.deleteCommentsByIds(
        findpost.comments,
      );
      const deletedpost = await this.postModel.findByIdAndDelete({
        _id: postid,
        author: userid,
      });
      return deletedpost;
    } catch (error) {
      throw error;
    }
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

  async updateComment(userId: User, postId: string, comment: PostCommentDto) {
    try {
      const finsfirst = await this.postModel.find({
        ... comment,
        userId,
        postId,
      }) 
      const commentupdate= await this.commentservice.postComment(userId,postId,comment)
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
