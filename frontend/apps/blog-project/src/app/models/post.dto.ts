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
  content: string;
}
