import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Role } from 'src/roles/role.entity';

@Entity('menus')
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    @ManyToMany(() => Role, (role) => role.menus)
    @JoinTable({
        name: 'menu_roles',
        joinColumn: { name: 'menu_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    roles: Role[];

    @ManyToOne(() => Menu, (menu) => menu.children, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'parent_id' })
    parent?: Menu | null;

    @OneToMany(() => Menu, (menu) => menu.parent)
    children: Menu[];
}