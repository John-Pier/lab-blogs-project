import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BPRoute } from '../../models';

@Component({
  selector: 'bp-not-found',
  templateUrl: 'not-found.component.html',
  styleUrls: ['not-found.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  readonly contentPath = [BPRoute.Root, BPRoute.Content];
  constructor() {}

  ngOnInit() {}
}
