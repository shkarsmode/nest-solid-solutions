import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { Admin } from '../modules/admin/models/admin.entity';

export class CreateFirstAdmin1696456410887 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const adminRepository: Repository<Admin> = queryRunner.connection.getRepository(Admin);
        if (await adminRepository.findOneBy({ login: 'admin' })) {
            return;
        }

        const admin = adminRepository.create({ 
            login: 'admin', 
            passwordHash: '$2a$10$4c1SgqRXWQn9LlMAlv1iI.ruuFcU6y8D2WdnZwbLqwco5EYgUI1HO',
            nickName: 'shkarsmode'
        });

        await adminRepository.insert(admin);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const adminRepository: Repository<Admin> = queryRunner.connection.getRepository(Admin);
        const admin: Admin = await adminRepository.findOneBy({ login: 'admin' });

        if (!admin) {
            return;
        }

        await adminRepository.remove(admin);
    }

}
