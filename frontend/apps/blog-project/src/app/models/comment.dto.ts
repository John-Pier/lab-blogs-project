import { ShortUserDto } from './user.dto';

export interface CommentDto {
  id: string;
  updatedAt: string | null;
  createdAt: string
  content: string;
  user: ShortUserDto;
  postId: string | null
}
