import { PostPreviewDto } from './post.dto';
import { ShortUserDto } from './user.dto';

export interface BlogPreviewDto {
  id: string;
  name: string;
  description: string;
  createdAt: string | Date;
  postsCount: number;
  createdBy: ShortUserDto;
  categories: any[];
}

export interface BlogDto {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Archive';
  createdAt: string | Date;
  posts: PostPreviewDto[];
  createdBy: ShortUserDto;
  categories: any[];
}
