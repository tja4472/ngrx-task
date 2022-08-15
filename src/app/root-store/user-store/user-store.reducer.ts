// ng generate reducer root-store/UserStore --flat=false
// CREATE src/app/root-store/user-store/user-store.reducer.spec.ts (337 bytes)
// CREATE src/app/root-store/user-store/user-store.reducer.ts
//
import { Action, createReducer, on } from '@ngrx/store';

import { AuthApiActions } from '@app/auth/actions';
import { SidenavActions } from '@app/core/components/sidenav/actions';

import { User } from '@app/models';

export const userStoreFeatureKey = 'userStore';

export interface State {
  user: User | null;
  taskListId: string | null;
}

export const initialState: State = {
  user: null,
  taskListId: null,
};

export const reducer = createReducer(
  initialState,
  on(
    SidenavActions.selectTaskListId,
    (state, action): State => ({
      ...state,
      taskListId: action.taskListId,
    })
  ),
  on(
    AuthApiActions.signInHaveUser,
    (state, action): State => ({
      ...state,
      user: {
        email: action.appUser.email,
        id: action.appUser.uid,
      },
      taskListId: action.appUser.taskListId,
    })
  )
);
