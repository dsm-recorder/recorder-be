import { User } from '../user';

export interface UserPort {
    queryUserByAccountId(accountId: string): Promise<User | null>;

    saveUser(user: User): Promise<User>;

    deleteUser(user: User): Promise<void>;
}

export const UserPort = Symbol('IUserPort');
