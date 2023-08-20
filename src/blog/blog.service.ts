import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Blog } from '../interfaces/blog.interface';
import { Comment } from '../interfaces/comment.interface';
import { Blogs, blogProviders } from '../models/blog.model'; 
import { Comments, commentsProviders } from '../models/comment.model'; 

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_REPOSITORY')
    private blogRepository: typeof Blogs,

    @Inject('COMMENTS_REPOSITORY')
    private commentsRepository: typeof Comments
  ) { }
    
  async createBody(createBlogDto: Blog) {
    const blogContent = createBlogDto?.blogContent || "Body to be posted is not found";

    try {
      let isExistedTitle = await this.blogRepository.findOne({ where: { blogTitle: createBlogDto.blogTitle } })
      if (isExistedTitle) throw new BadRequestException(`${createBlogDto.blogTitle} Title is already used!`)
      let result: any = await this.blogRepository.create({
        ...createBlogDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log("blog post console : ",result);
      return result;
    } catch (error) {
      {
        console.error('Error in createBody method', error);
        return "CREATE POST FAILURE";
      }
    }
  }

  async fetchAllBlogs() {
    console.log("fetch all blogs");
    let blogs = await this.blogRepository.findAll();
    return blogs;
  }

  async deletePost(title: string): Promise<string> {
    try {
      let postObj = await this.blogRepository.findOne( {where :{ blogTitle: title }});
      if (!postObj) throw new NotFoundException("NOT_FOUND");

      await this.blogRepository.destroy({
        where: {
          blogTitle: title
        },
      })
        .then((rowsDeleted) => {
          if (rowsDeleted === 1) {
            console.log('Blog deleted successfully.');
            return "DELETE SUCCESSFUL";
          } else {
            console.log('Blog not found.');
            return "RECORD NOT FOUND";
          }
        })
        .catch((error) => {
          console.error('Error deleting blog:', error);
          return "DELETE FAILURE";
        });
    } catch (error) {
      console.error('Error in delete method', error);
      return "DELETE FAILURE";
    }
  }

  async addCommentInBlog(createCommentDto: Comment) {

      try {
        let isExistedTitle = await this.blogRepository.findOne({
          where: { blogTitle: createCommentDto.blogTitle },
        });
        if (!isExistedTitle)
          throw new BadRequestException(
            `${createCommentDto.blogTitle} Title doesn't exist!`,
          );

        let result: any = await this.commentsRepository.create({
          ...createCommentDto,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        console.log('comment post console : ', result);
        return result;
      } catch (err) {
        console.error('Error in addCommentInBlog method', err);
        return "COMMENT POST FAILURE";
      }
  }
}