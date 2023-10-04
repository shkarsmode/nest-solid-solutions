import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvConfig } from '../../../shared/enums/EnvConfig.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(EnvConfig.JWT_SECRET)
        });
    }

    public async validate(payload: any): Promise<any> {
        const { iat, exp, ...res } = payload;
        return res;
    }
}
