import { UserService } from './user.service';
import { User } from './user.entitiy';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(user: CreateUserDto): Promise<User>;
    getUser(email: string): Promise<User | null>;
    updateUser(email: string, user: UpdateUserDto): Promise<void>;
    deleteUser(email: string): Promise<import("typeorm").DeleteResult>;
}
