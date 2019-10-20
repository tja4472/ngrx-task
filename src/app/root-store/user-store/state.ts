import { User } from '@app/models';

export interface State {
  user: User;
  taskListId: string;
}

export const initialState: State = {
  user: null,
  taskListId: null,
};
