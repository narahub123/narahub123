import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    register(userDto: CreateUserDto): Promise<import("../user/user.entitiy").User>;
}
