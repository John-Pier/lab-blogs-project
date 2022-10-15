import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bp-not-found',
  templateUrl: 'not-found.component.html',
  styleUrls: ['not-found.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
