import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'bp-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogEditComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
