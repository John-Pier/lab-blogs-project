import { Component, OnInit } from '@angular/core';
import { MainApiService } from '../../../../services';

@Component({
  selector: 'bp-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less'],
})
export class ArticlesComponent implements OnInit {
  readonly blogs$ = this.mainApiService.loadBlogs();
  readonly categories$ = this.mainApiService.loadCategories();
  readonly posts$ = this.mainApiService.loadPosts();

  constructor(private readonly mainApiService: MainApiService) {}

  ngOnInit(): void {}
}
