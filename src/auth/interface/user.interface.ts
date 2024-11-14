import { UserProvider } from 'src/users/enums/user.enum';

export interface IUser {
  email: string;
  password?: string;
  avatarUrl: string;
  provider: UserProvider;
}
