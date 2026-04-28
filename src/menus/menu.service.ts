import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
    MenuResponseDto,
    MenuItemResponseDto,
} from './dto/menu.response.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepo: Repository<Menu>,
    ) { }

    async create(dto: CreateMenuDto): Promise<MenuResponseDto> {
        const menu = this.menuRepo.create({
            name: dto.name,
            path: dto.path,
            parent: dto.parentId
                ? ({ id: dto.parentId } as Menu)
                : null,
        });

        const saved = await this.menuRepo.save(menu);

        return {
            statusCode: 201,
            message: 'Menu berhasil dibuat',
            data: [
                {
                    id: saved.id,
                    name: saved.name,
                    path: saved.path,
                    children: [],
                },
            ],
        };
    }

    async findAll(): Promise<MenuResponseDto> {
        const menus = await this.menuRepo.find({
            relations: ['parent', 'children'],
        });

        const map = new Map<number, MenuItemResponseDto>();

        menus.forEach((menu) => {
            map.set(menu.id, {
                id: menu.id,
                name: menu.name,
                path: menu.path,
                children: [],
            });
        });

        const tree: MenuItemResponseDto[] = [];

        menus.forEach((menu) => {
            const node = map.get(menu.id);
            if (!node) return;

            if (menu.parent) {
                const parent = map.get(menu.parent.id);
                if (parent) parent.children.push(node);
            } else {
                tree.push(node);
            }
        });

        return {
            statusCode: 200,
            message: 'Menu berhasil diambil',
            data: tree,
        };
    }

    async findOne(id: number): Promise<Menu> {
        const menu = await this.menuRepo.findOne({
            where: { id },
            relations: ['parent', 'children'],
        });

        if (!menu) throw new NotFoundException('Menu tidak ditemukan');

        return menu;
    }

    async update(id: number, dto: UpdateMenuDto): Promise<MenuResponseDto> {
        const menu = await this.findOne(id);

        menu.name = dto.name ?? menu.name;
        menu.path = dto.path ?? menu.path;

        menu.parent = dto.parentId
            ? ({ id: dto.parentId } as Menu)
            : null;

        const updated = await this.menuRepo.save(menu);

        return {
            statusCode: 200,
            message: 'Menu berhasil diupdate',
            data: [
                {
                    id: updated.id,
                    name: updated.name,
                    path: updated.path,
                    children: [],
                },
            ],
        };
    }

    async remove(id: number): Promise<MenuResponseDto> {
        const menu = await this.findOne(id);
        await this.menuRepo.remove(menu);

        return {
            statusCode: 200,
            message: 'Menu berhasil dihapus',
            data: [],
        };
    }

    async getMenuByRole(roleId: number): Promise<MenuResponseDto> {
        const menus = await this.menuRepo
            .createQueryBuilder('menu')
            .leftJoinAndSelect('menu.roles', 'role')
            .leftJoinAndSelect('menu.parent', 'parent')
            .where('role.id = :roleId', { roleId })
            .getMany();

        const map = new Map<number, MenuItemResponseDto>();

        menus.forEach((menu) => {
            map.set(menu.id, {
                id: menu.id,
                name: menu.name,
                path: menu.path,
                children: [],
            });
        });

        const tree: MenuItemResponseDto[] = [];

        menus.forEach((menu) => {
            const node = map.get(menu.id);
            if (!node) return;

            if (menu.parent) {
                const parent = map.get(menu.parent.id);
                if (parent) parent.children.push(node);
            } else {
                tree.push(node);
            }
        });

        return {
            statusCode: 200,
            message: 'Menu berdasarkan role berhasil diambil',
            data: tree,
        };
    }
}