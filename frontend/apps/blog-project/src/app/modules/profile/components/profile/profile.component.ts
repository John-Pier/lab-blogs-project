import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileDto } from '../../../../models';
import { UserProfileService } from '../../../../services';
import { makeFullName } from '../../../../utils';

@Component({
  selector: 'bp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
  userProfile!: UserProfileDto | null;
  userFullName!: string;

  constructor(private readonly userProfileService: UserProfileService, private readonly router: Router) {}

  ngOnInit(): void {
    this.userProfile = this.userProfileService.getUserProfile();
    this.userFullName = makeFullName(this.userProfile);
  }
}
