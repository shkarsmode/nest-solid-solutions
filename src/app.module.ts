import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminMenuModule } from './modules/admin-menu/admin-menu.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnvConfig } from './shared/enums/EnvConfig.enum';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>(EnvConfig.DB_HOST),
                port: +configService.get<number>(EnvConfig.DB_PORT),
                username: configService.get<string>(EnvConfig.DB_USERNAME),
                password: configService.get<string>(EnvConfig.DB_PASSWORD),
                database: configService.get<string>(EnvConfig.DB_NAME),
                entities: ["dist/**/*.entity{.ts,.js}"],
                dropSchema: false,
                synchronize: true,
                migrationsRun: false,
                logging: true,
                migrations: ["dist/**/migrations/*{.ts,.js}"]
            }),
            inject: [ConfigService]
        }),
        AuthModule,
        AdminMenuModule,
        ConfigModule.forRoot()
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}