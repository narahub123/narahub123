"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_kakao_1 = require("passport-kakao");
const user_service_1 = require("../user/user.service");
let KakaoStrategy = class KakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy) {
    userService;
    constructor(userService) {
        super({
            clientID: process.env.KAKAO_CLIENT_ID,
            callbackURL: 'http://localhost:3000/auth/kakao',
        });
        this.userService = userService;
    }
    async validate(accessToken, refreshToken, profile) {
        console.log('토큰1', accessToken);
        console.log('토큰2', refreshToken);
        const providerId = 'kakao';
        const email = profile._json.kakao_account.email;
        const name = profile.displayName;
        console.log(email, name);
        const user = await this.userService.findByEmailOrSave(email, name, providerId);
        return user;
    }
};
exports.KakaoStrategy = KakaoStrategy;
exports.KakaoStrategy = KakaoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], KakaoStrategy);
//# sourceMappingURL=kakao.strategy.js.map