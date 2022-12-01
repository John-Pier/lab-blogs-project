import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type BreadcrumbsItem = {
  id: number;
  label: string;
  path: string[];
};

@Injectable()
export class BreadcrumbsService {
  private readonly items$ = new BehaviorSubject<BreadcrumbsItem[]>([]);

  selectItems$(): Observable<BreadcrumbsItem[]> {
    return this.items$.asObservable();
  }

  setNextItem(label: string, path: string[]) {
    const items = this.items$.getValue();
    this.items$.next([
      ...items,
      {
        label,
        path,
        id: items.length + 1,
      },
    ]);
  }

  backToId(id: number) {
    const items = this.items$.getValue();
    this.items$.next(items.slice(0, id));
  }

  clear() {
    this.items$.next([]);
  }
}
