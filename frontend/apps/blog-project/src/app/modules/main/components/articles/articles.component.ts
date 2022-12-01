import { Component, OnInit } from '@angular/core';
import { tuiPure } from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { BlogPreviewDto } from '../../../../models';
import { MainApiService } from '../../../../services';

@Component({
  selector: 'bp-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less'],
})
export class ArticlesComponent implements OnInit {
  readonly blogs$: Observable<BlogPreviewDto[]> = this.mainApiService.loadBlogsPreview();

  constructor(private readonly mainApiService: MainApiService) {}

  ngOnInit(): void {}

  @tuiPure
  getBlogLink(blogId: string): string[] {
    return [blogId];
  }
}
