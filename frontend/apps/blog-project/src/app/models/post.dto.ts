import { ShortUserDto } from './user.dto';

export interface PostPreviewDto {
  id: string;
  label: string;
  description: string;
  preview: string;
  createdAt: string | Date;
  commentsCount: number;
  userId: string;
  blogId: string;
}

export interface PostDto extends PostPreviewDto {
  id: string;
  label: string;
  description: string;
  createdAt: string | Date;
  user: ShortUserDto;
  blogId: string;
  content: string;
}
