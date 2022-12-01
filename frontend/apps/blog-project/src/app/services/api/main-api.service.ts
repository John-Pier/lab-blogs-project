import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH, BlogDto, BlogPreviewDto, CategoryDto, CommentDto, PostDto, PostPreviewDto } from '../../models';

export type MainParams = {
  from?: string;
  sort?: 'dec' | 'acs';
  userIds?: string[];
};

@Injectable()
export class MainApiService {
  private blogsPath = '/blogs';
  private categoriesPath = '/categories';
  private commentsPath = '/comments';
  private postsPath = '/posts';
  private readonly allPath = '/all';
  private readonly previewsPath = '/previews';
  private readonly fullPath = '/full';

  constructor(private readonly httpClient: HttpClient) {}

  loadBlogs(params?: MainParams): Observable<BlogDto[]> {
    return this.httpClient.get<BlogDto[]>(API_PATH + this.blogsPath + this.allPath, {
      params: params,
    });
  }

  loadBlog(blogId: string): Observable<BlogDto> {
    return this.httpClient.get<BlogDto>(`${API_PATH + this.blogsPath + this.fullPath}/${blogId}`);
  }

  loadBlogsPreview(params?: MainParams): Observable<BlogPreviewDto[]> {
    return this.httpClient.get<BlogPreviewDto[]>(API_PATH + this.blogsPath + this.previewsPath + this.allPath, {
      params: params,
    });
  }

  loadCategories(params?: MainParams): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(API_PATH + this.categoriesPath + this.allPath, {
      params: params,
    });
  }

  loadPosts(params?: MainParams): Observable<PostDto[]> {
    return this.httpClient.get<PostDto[]>(API_PATH + this.postsPath + this.allPath, {
      params: params,
    });
  }

  loadPostsPreview(blogId: string, params?: MainParams): Observable<PostPreviewDto[]> {
    return this.httpClient.get<PostPreviewDto[]>(API_PATH + this.postsPath + this.previewsPath, {
      params: {
        ...params,
        blogId: blogId,
      },
    });
  }

  loadComments(postId: string, params?: MainParams): Observable<CommentDto[]> {
    return this.httpClient.get<CommentDto[]>(API_PATH + this.commentsPath + this.allPath, {
      params: { postId: postId, ...params },
    });
  }
}
