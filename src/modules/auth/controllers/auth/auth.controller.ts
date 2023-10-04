import { Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IResponseAccessToken } from '../../../../shared/interfaces/IResponseAccessToken';
import { Admin } from '../../../admin/models/admin';
import { AdminRepository } from '../../../admin/services/admin.repository';
import { AuthService } from '../../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private adminRepository: AdminRepository
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Request() req): Promise<IResponseAccessToken> {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('refreshJwt'))
    @Put('refresh')
    public async refresh(@Request() req): Promise<IResponseAccessToken> {
        const admin = await this.adminRepository.findById(req.user.id);
        return this.authService.login(admin);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    public async getProfile(@Request() req): Promise<Admin> {
        return req.user;
    }
}
