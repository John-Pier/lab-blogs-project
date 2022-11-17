import { UserProfileDto } from '../models';

export function makeFullName(profile: UserProfileDto | null): string {
  if (!profile) {
    return '';
  }
  return `${profile.secondName} ${profile.firstName}`.trim();
}
