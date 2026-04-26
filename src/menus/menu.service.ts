import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepo: Repository<Menu>,
    ) { }

    async getMenuByUser(userId: number): Promise<Menu[]> {
        return this.menuRepo
            .createQueryBuilder('menu')
            .innerJoin('menu.role', 'role')
            .innerJoin('role.userRoles', 'userRole')
            .innerJoin('userRole.user', 'user')
            .where('user.id = :userId', { userId })
            .getMany();
    }
}