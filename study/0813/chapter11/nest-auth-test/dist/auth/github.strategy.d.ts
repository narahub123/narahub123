import { Strategy } from 'passport-github2';
import { User } from 'src/user/user.entitiy';
import { UserService } from 'src/user/user.service';
declare const GithubStrategy_base: new (...args: [options: import("passport-github2").StrategyOptionsWithRequest] | [options: import("passport-github2").StrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GithubStrategy extends GithubStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<User>;
}
export {};
