import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bp-forbidden',
  templateUrl: 'forbidden.component.html',
  styleUrls: ['forbidden.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
