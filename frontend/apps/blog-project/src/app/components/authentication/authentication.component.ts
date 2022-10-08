import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bp-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
