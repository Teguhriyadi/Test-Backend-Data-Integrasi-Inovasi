import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BaseResponse } from '../common/dto/base-response.dto';
import { Menu } from 'src/entities';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,

        @InjectRepository(Menu)
        private readonly menuRepo: Repository<Menu>,
    ) { }

    async create(dto: CreateRoleDto): Promise<BaseResponse<Role>> {
        const existing = await this.roleRepo.findOne({
            where: { name: dto.name },
        });

        if (existing) {
            throw new BadRequestException('Role sudah ada');
        }

        const role = this.roleRepo.create(dto);
        const saved = await this.roleRepo.save(role);

        return {
            statusCode: 201,
            message: 'Role berhasil dibuat',
            data: saved,
        };
    }

    async findAll(): Promise<BaseResponse<Role[]>> {
        const roles = await this.roleRepo.find();

        return {
            statusCode: 200,
            message: 'List role berhasil diambil',
            data: roles,
        };
    }

    async findOne(id: number): Promise<BaseResponse<Role>> {
        const role = await this.roleRepo.findOne({
            where: { id },
            relations: ['menus'],
        });

        if (!role) {
            throw new NotFoundException('Role tidak ditemukan');
        }

        return {
            statusCode: 200,
            message: 'Detail role berhasil diambil',
            data: role,
        };
    }

    async update(
        id: number,
        dto: UpdateRoleDto,
    ): Promise<BaseResponse<Role>> {
        const role = await this.roleRepo.findOne({ where: { id } });

        if (!role) {
            throw new NotFoundException('Role tidak ditemukan');
        }

        if (dto.name) {
            const existing = await this.roleRepo.findOne({
                where: { name: dto.name },
            });

            if (existing && existing.id !== id) {
                throw new BadRequestException('Nama role sudah digunakan');
            }
        }

        Object.assign(role, dto);
        const updated = await this.roleRepo.save(role);

        return {
            statusCode: 200,
            message: 'Role berhasil diupdate',
            data: updated,
        };
    }

    async remove(id: number): Promise<BaseResponse<null>> {
        const role = await this.roleRepo.findOne({ where: { id } });

        if (!role) {
            throw new NotFoundException('Role tidak ditemukan');
        }

        await this.roleRepo.remove(role);

        return {
            statusCode: 200,
            message: 'Role berhasil dihapus',
            data: null,
        };
    }

    async assignMenus(roleId: number, menuIds: number[]) {
        const role = await this.roleRepo.findOne({
        where: { id: roleId },
        relations: ['menus'],
        });

        if (!role) throw new NotFoundException('Role tidak ditemukan');

        const menus = await this.menuRepo.findByIds(menuIds);

        role.menus = menus;

        await this.roleRepo.save(role);

        return {
        message: 'Menu berhasil di-assign ke role',
        };
    }
}