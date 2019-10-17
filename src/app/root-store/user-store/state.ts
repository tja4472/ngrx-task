import { User } from '@app/models';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null,
};
