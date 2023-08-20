import { Post } from '@nestjs/common';
import { Table, Column, Model, HasMany, PrimaryKey, Unique, AutoIncrement} from 'sequelize-typescript';
import { Comments } from './comment.model';
import { UUID } from 'crypto';

@Table
export class Blogs extends Model {
  @PrimaryKey
  @Unique
  @Column
  blogTitle: string;

  @Column
  blogContent: string;

  @Column
  author: string;

  @HasMany(() => Comments)
  comments: Comments[];
}


export const blogProviders = [
  {
    provide: 'BLOG_REPOSITORY',
    useValue: Blogs,
  },
];