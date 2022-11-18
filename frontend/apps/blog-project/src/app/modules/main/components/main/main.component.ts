import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BPRoute } from '../../../../models';

@Component({
  selector: 'bp-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  readonly contentPath = [BPRoute.Root, BPRoute.Content];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}
}
