import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommentDto } from '../../../../models';

@Component({
  selector: 'bp-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less'],
})
export class CommentComponent implements OnInit {
  @Input()
  comment: CommentDto | undefined;

  @HostBinding('class.comments')
  private class = true;

  constructor() {}

  ngOnInit(): void {}
}
