export type UserAuthDto = {
  login: string;
  password: string;
};

export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN';

export type UserProfileDto = {
  login: string;
  firstName: string;
  secondName: string;
  email: string;
  country?: string;
  city?: string;
  gender?: boolean;
  birthDate?: string | Date;
  userRole?: UserRole;
};

export type UserWithCredentialsDto = UserProfileDto & UserAuthDto;