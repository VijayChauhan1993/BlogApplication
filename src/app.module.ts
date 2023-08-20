import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { blogProviders } from './models/blog.model';
import {commentsProviders} from './models/comment.model'

@Module({
  imports: [BlogModule],
  controllers: [AppController, BlogController],
  providers: [AppService, BlogService, ...blogProviders, ...commentsProviders],
})
export class AppModule {}

