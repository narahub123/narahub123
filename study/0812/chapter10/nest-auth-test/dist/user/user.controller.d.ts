import { UserService } from './user.service';
import { User } from './user.entitiy';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(user: User): Promise<User>;
    getUser(email: string): Promise<User | null>;
    updateUser(email: string, user: User): Promise<void>;
    deleteUser(email: string): Promise<import("typeorm").DeleteResult>;
}
