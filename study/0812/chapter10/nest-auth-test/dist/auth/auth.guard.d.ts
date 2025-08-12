import { CanActivate } from '@nestjs/common';
import { AuthService } from './auth.service';
export declare class LoginGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: any): Promise<boolean>;
}
