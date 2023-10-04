import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../../admin/models/admin';
import { AdminRepository } from '../../admin/services/admin.repository';

@Injectable()
export class AuthService {
    constructor(
		private adminRepository: AdminRepository,
		private jwtService: JwtService
	) {}

    public async validateAdmin(login: string, password: string): Promise<Admin | null> {
		const admin: Admin = await this.adminRepository.findByLogin(login);
		if (admin && admin.password === password) {
			const { password, ...secureAdmin } = admin;
			return secureAdmin;
		}

        return null;
    }

	public async login(admin: Admin): Promise<{ accessToken: string }> {
		const payload = { id: admin.id };
		return {
			accessToken: this.jwtService.sign(payload)
		}
	}
}
