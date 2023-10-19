import { Module } from '@nestjs/common';
import { MenuController } from './controllers/menu/menu.controller';


@Module({
    controllers: [MenuController],
})
export class AdminMenuModule {}
