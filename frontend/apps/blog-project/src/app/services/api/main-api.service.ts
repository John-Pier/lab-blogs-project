import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH, BlogDto, CategoryDto, PostDto } from '../../models';

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

  constructor(private readonly httpClient: HttpClient) {}

  loadBlogs(params?: MainParams): Observable<BlogDto[]> {
    return this.httpClient.get<BlogDto[]>(API_PATH + this.blogsPath + this.allPath, {
      params: params,
    });
  }

  loadCategories(params?: MainParams): Observable<CategoryDto[]> {
    return this.httpClient.get<BlogDto[]>(API_PATH + this.categoriesPath + this.allPath, {
      params: params,
    });
  }

  loadPosts(params?: MainParams): Observable<PostDto[]> {
    return this.httpClient.get<BlogDto[]>(API_PATH + this.postsPath + this.allPath, {
      params: params,
    });
  }

  loadComments(postId: string, params?: MainParams): Observable<CategoryDto[]> {
    return this.httpClient.get<BlogDto[]>(API_PATH + this.commentsPath + this.allPath, {
      params: { postId: postId, ...params },
    });
  }
}
