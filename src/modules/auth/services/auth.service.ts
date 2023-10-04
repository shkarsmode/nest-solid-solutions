import { Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Admin } from '../../admin/models/admin.entity';

@Injectable()
export class AuthService {
    constructor(
		@InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
		private jwtService: JwtService
	) {}

    public async validateAdmin(login: string, password: string): Promise<Admin | null> {
		const admin: Admin = await this.adminRepository.findOneBy({ login });
		
		if (admin && await bcrypt.compare(password, admin.passwordHash)) {
			const { passwordHash, ...secureAdmin } = admin;
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
