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

export interface BlogDto extends BlogPreviewDto {
  id: string;
}
