import { createAction, props } from '@ngrx/store';

const title = 'Home Page';

export const loadHomes = createAction(`[${title}] Load Homes`);

export const signOut = createAction(`[${title}] Sign Out`);
