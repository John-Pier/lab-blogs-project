import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BPRoute } from '../../../../models';
import { BreadcrumbsService } from '../../services';

@Component({
  selector: 'bp-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  providers: [BreadcrumbsService],
})
export class MainComponent implements OnInit {
  readonly contentPath = [BPRoute.Root, BPRoute.Content];

  readonly breadcrumbsItems$ = this.breadcrumbsService.selectItems$();

  constructor(private readonly router: Router, private readonly breadcrumbsService: BreadcrumbsService) {}

  ngOnInit(): void {}

  onBackClick(id?: number) {
    if (id) {
      this.breadcrumbsService.backToId(id);
    } else {
      this.breadcrumbsService.clear();
    }
  }
}
