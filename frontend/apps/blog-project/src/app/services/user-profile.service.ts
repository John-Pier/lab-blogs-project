import { Injectable } from '@angular/core';
import { UserProfileDto, UserRole } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly profile_key = 'user_profile';

  constructor() {}

  setUserProfile(profile: UserProfileDto) {
    localStorage.setItem(this.profile_key, JSON.stringify(profile));
  }

  clearUserProfile() {
    localStorage.removeItem(this.profile_key);
  }

  hasUserProfile(): boolean {
    return !!localStorage.getItem(this.profile_key);
  }

  getUserProfile(): UserProfileDto | null {
    const profileJson = localStorage.getItem(this.profile_key);
    if (profileJson) {
      return JSON.parse(profileJson);
    }
    return null;
  }

  getUserRole(): UserRole | null {
    return this.getUserProfile()?.userRole || null;
  }

  isModeratorAccess(): boolean {
    return this.getUserRole() === 'MODERATOR';
  }

  isAdminAccess(): boolean {
    return this.getUserRole() === 'ADMIN';
  }
}
