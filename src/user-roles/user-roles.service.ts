import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './user-roles.entity';

@Injectable()
export class UserRolesService {
    constructor(
        @InjectRepository(UserRole)
        private readonly repo: Repository<UserRole>,
    ) { }

    async assign(dto: { userId: number; roleId: number }) {
        const data = this.repo.create({
            user: { id: dto.userId },
            role: { id: dto.roleId },
        });

        return this.repo.save(data);
    }
}