import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class Blog {
    @IsString()
    @IsNotEmpty()
    blogContent?: string;

    @IsString()
    @IsNotEmpty()
    blogTitle?: string;

    @IsNotEmpty()
    blogId?: any;

    @IsString()
    @IsOptional()
    author?: string;
}