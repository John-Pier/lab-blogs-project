import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'bp-post-create',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
