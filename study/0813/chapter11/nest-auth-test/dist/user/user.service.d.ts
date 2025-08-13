import { User } from './user.entitiy';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(user: any): Promise<User>;
    getUser(email: string): Promise<User | null>;
    updateUser(email: any, _user: any): Promise<void>;
    deleteUser(email: string): Promise<import("typeorm").DeleteResult>;
}
