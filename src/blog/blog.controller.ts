import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from '../interfaces/blog.interface';
import { Comment } from '../interfaces/comment.interface';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get()
    findAll(): string {
      return 'Welcome to the blog page';
    }

    @Get('fetchAll')
    fetchBlog(): any {
      const body = this.blogService.fetchAllBlogs();

      return body;
    }
    
    @Post('/postBlog')
    create(@Body() createBlogDto: Blog): any {

      console.log('Blog Body to posted : ', createBlogDto?.blogContent);
      const body = this.blogService.createBody(createBlogDto);

      return ({ body, createBlogDto });
    }
  
  
    @Delete(':title')
    remove(@Param('title') title: string) {
      return this.blogService.deletePost(title);
    }
  
  
    @Post('/postComment')
    createComment(@Body() createCommentDto: Comment): any {

      console.log('Comment Body to posted : ', createCommentDto?.comment);
      const body = this.blogService.addCommentInBlog(createCommentDto);

      return ({ body, createCommentDto });
    }
  
}