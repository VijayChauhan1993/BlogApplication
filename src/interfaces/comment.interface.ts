import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class Comment {
    @IsString()
    @IsNotEmpty()
    comment?: string;

    @IsNotEmpty()
    commentId?: any;

    @IsString()
    @IsOptional()
    commentedBy?: string;

    @IsString()
    @IsNotEmpty()
    blogTitle?: string;
}