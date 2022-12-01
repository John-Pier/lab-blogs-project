import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';
import { BPRoute, PostPreviewDto } from '../../../../models';
import { MainApiService } from '../../../../services';
import { BreadcrumbsService } from '../../services';

@Component({
  selector: 'bp-posts-preview',
  templateUrl: './posts-preview.component.html',
  styleUrls: ['./posts-preview.component.less'],
})
export class PostsPreviewComponent implements OnInit {
  @Input()
  post: PostPreviewDto | undefined;

  showPreview = false;

  constructor(
    private readonly mainApiService: MainApiService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit(): void {}

  @tuiPure
  public getPostLink(id: string): string[] {
    return ['/', BPRoute.Content, BPRoute.Posts, id];
  }
}
