import { createAction } from '@ngrx/store';

const title = 'Home Page';

export const signOut = createAction(`[${title}] Sign Out`);
