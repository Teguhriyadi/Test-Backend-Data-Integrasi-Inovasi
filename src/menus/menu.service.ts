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

    async getMenuByRole(roleId: number): Promise<any> {
        const menus = await this.menuRepo.find({
            where: {
                roles: {
                    id: roleId,
                },
            },
            relations: ['parent', 'children'],
        });

        const map = new Map<number, any>();

        menus.forEach((menu) => {
            map.set(menu.id, { ...menu, children: [] });
        });

        const tree: any[] = [];

        menus.forEach((menu) => {
            const node = map.get(menu.id);

            if (menu.parent) {
                const parent = map.get(menu.parent.id);
                if (parent) {
                    parent.children.push(node);
                }
            } else {
                tree.push(node);
            }
        });

        return tree;
    }

    private buildTree(parents: Menu[], all: Menu[]) {
        return parents.map((parent) => {
            const children = all.filter(
                (m) => m.parent?.id === parent.id,
            );

            return {
                id: parent.id,
                name: parent.name,
                children: this.buildTree(children, all),
            };
        });
    }
}