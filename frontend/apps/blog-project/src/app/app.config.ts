import { InjectionToken } from '@angular/core';

export const BP_APP_API_CONFIG: InjectionToken<BPAppAPIConfig> = new InjectionToken<BPAppAPIConfig>(
  'BP_APP_API_CONFIG'
);
export const BP_CONTACTS_DATA_CONFIG: InjectionToken<BPContactsDataConfig> = new InjectionToken<BPContactsDataConfig>(
  'BP_CONTACTS_DATA_CONFIG'
);

export type BPAppAPIConfig = Readonly<{
  PORT: string | number;
  HOST_NAME: string;
  PROTOCOL: string;
  API_ADDRESS: string;
  API_VERSION: string | number;
}>;

export type BPContactsDataConfig = Readonly<{
  adminEmail: string;
  repoLink: string;
  repoText: string;
}>;

export const contactsDataConfig: BPContactsDataConfig = {
  adminEmail: 'no-email@gmail.com',
  repoLink: 'https://github.com/John-Pier/',
  repoText: '[github.com] Blog Project',
};
