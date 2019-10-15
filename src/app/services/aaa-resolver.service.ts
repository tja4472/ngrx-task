import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { select, Store } from '@ngrx/store';

import { EMPTY, Observable, of } from 'rxjs';
import { concatMap, filter, map, switchMap, take } from 'rxjs/operators';

import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

import { CurrentTask } from '../root-store/tasks-store/models';

@Injectable({
  providedIn: 'root',
})
export class AaaResolverService implements Resolve<CurrentTask> {
  constructor(private router: Router, private store: Store<any>) {}

  waitForCurrentTasksToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectCurrentTasksLoaded),
      filter((loaded) => loaded),
      take(1)
    );
  }

  getCurrentTask(id: string): Observable<CurrentTask> {
    return this.store.pipe(
      select(TaskSelectors.selectCurrentTasksAll),
      // map(entities => !!entities[id]),
      // filter(todos => todos.id === id),
      map((todos) => todos.filter((a) => a.id === id)[0]),
      take(1)
    );
  }

  /*
  hasBookInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromBooks.getBookEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }
  */

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CurrentTask> | Observable<never> {
    const id = route.paramMap.get('id');

    //   return this.store.pipe(
    //     select(TaskSelectors.getSelectedCurrentTask),);

    console.log('#### resolve ####');
    console.log('id>', id);

    // return of(newTodo());
    return this.waitForCurrentTasksToLoad().pipe(
      switchMap(() => this.getCurrentTask(id)),
      concatMap((a) => {
        if (a) {
          return of(a);
        } else {
          // this.router.navigate(['/404'], { skipLocationChange: true });
          return EMPTY;
        }
      })
    );

    /*
    return this.store.pipe(
      select(TaskSelectors.getAAALoaded),
      filter((loaded) => loaded),
      take(1),
      switchMap(() => select(TaskSelectors.getSelectedCurrentTask)),
      take(1)
    );
*/
  }
}
