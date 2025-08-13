import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(userDto: CreateUserDto): Promise<import("../user/user.entitiy").User>;
    login(req: any, res: any): Promise<any>;
    login2(req: any, res: any): Promise<any>;
    testGuard(): string;
    login3(req: any): any;
    testGuardWithSession(req: any): any;
    googleAuth(req: any): Promise<void>;
    gooleAuthRedirect(req: any, res: any): Promise<any>;
    kakaoAuth(req: any): Promise<void>;
    kakaoAuthRedirect(req: any, res: any): Promise<any>;
    githubAuth(req: any): Promise<void>;
    githubAuthRedirect(req: any, res: any): Promise<any>;
    s: any;
}
