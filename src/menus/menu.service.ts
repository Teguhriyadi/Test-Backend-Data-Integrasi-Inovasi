import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { Repository } from 'typeorm';
import { MenuItemResponseDto, MenuResponseDto } from './dto/menu.response.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepo: Repository<Menu>,
    ) {}

    async getMenuByRole(roleId: number): Promise<MenuResponseDto> {
        const menus = await this.menuRepo.find({
            where: {
                roles: {
                    id: roleId,
                },
            },
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
                if (parent) {
                    parent.children.push(node);
                }
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
}