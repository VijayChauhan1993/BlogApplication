import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { blogProviders } from '../models/blog.model';
import { DatabaseModule } from '../sequelize/sequelize.providers';
import { commentsProviders } from 'src/models/comment.model';

@Module({
  imports : [DatabaseModule],
  controllers: [BlogController],
  providers: [BlogService, ...blogProviders, ...commentsProviders],
})
export class BlogModule {}