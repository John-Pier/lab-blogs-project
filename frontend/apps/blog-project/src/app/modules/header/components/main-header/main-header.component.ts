import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { BPRoute, UserProfileDto } from '../../../../models';
import { AuthTokenApiService, UserProfileService } from '../../../../services';
import { makeFullName } from '../../../../utils';

@Component({
  selector: 'bp-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.less'],
})
export class MainHeaderComponent implements OnInit {
  userProfile!: UserProfileDto | null;
  userFullName!: string;
  optionsOpen = false;
  activeItemIndex = 0;

  readonly profilePath = [BPRoute.Root, BPRoute.Content, BPRoute.Profile];
  readonly options = [
    {
      name: 'Выйти',
      icon: 'tuiIconUpload',
      onClick: () => this.logout(),
    },
  ];

  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly router: Router,
    private readonly authTokenApiService: AuthTokenApiService
  ) {}

  ngOnInit(): void {
    this.userProfile = this.userProfileService.getUserProfile();
    this.userFullName = makeFullName(this.userProfile);
  }

  public navigateToProfile() {
    this.router.navigate([BPRoute.Root, BPRoute.Content, BPRoute.Profile]);
  }

  public logout() {
    this.authTokenApiService
      .logout$()
      .pipe(
        switchMap(() => {
          this.userProfileService.clearUserProfile();
          return this.router.navigate([BPRoute.Root, BPRoute.Auth]);
        })
      )
      .subscribe();
  }
}
