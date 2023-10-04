import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvConfig } from '../../shared/enums/EnvConfig.enum';
import { AdminModule } from '../admin/admin.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';
import { LocalStrategy } from './services/local.strategy';
import { RefreshJwtStrategy } from './services/refresh-jwt.strategy';

@Module({
    imports: [
        AdminModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>(EnvConfig.JWT_SECRET),
                signOptions: { expiresIn: configService.get<string>(EnvConfig.JWT_EXPIRES_IN) },
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        LocalStrategy,
        JwtStrategy,
        RefreshJwtStrategy
    ],
})
export class AuthModule {}
