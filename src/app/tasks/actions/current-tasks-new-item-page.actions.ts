import { createAction, props } from '@ngrx/store';

import { Todo } from '@app/tasks/models';

const title = 'Current Tasks New Item Page';

export const Saved = createAction(`[${title}] Saved`, props<{ todo: Todo }>());
