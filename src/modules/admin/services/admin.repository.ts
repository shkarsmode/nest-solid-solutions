import { Injectable } from '@nestjs/common';
import { Admin } from '../models/admin';

@Injectable()
export class AdminRepository {
    private readonly admins: Admin[];

    constructor() {
        this.admins = [{ id: 1, login: 'shkarsmode', password: '1234' }];
    }

    public async findByLogin(login: string): Promise<Admin | undefined> {
        return this.admins.find(admin => admin.login === login);
    }

    public async findById(id: number): Promise<Admin | undefined> {
        return this.admins.find(admin => admin.id === id);
    }
}
