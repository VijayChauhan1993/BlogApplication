import { Table, Column, Model, BelongsTo, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Blogs } from './blog.model';
import { UUID } from 'crypto';

@Table
export class Comments extends Model {

    @PrimaryKey
    @Column
    commentId: UUID;
    
  @Column
  comment: string;

  @Column
  commentedBy: string;
    
  @ForeignKey(() => Blogs)
  @Column
  blogTitle: string;
    
  @BelongsTo(() => Blogs)
  blog: Blogs;
    
}


export const commentsProviders = [
  {
    provide: 'COMMENTS_REPOSITORY',
    useValue: Comments,
  },
];