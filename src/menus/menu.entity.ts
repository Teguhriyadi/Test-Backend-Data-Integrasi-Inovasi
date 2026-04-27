import { Role } from 'src/roles/role.entity';
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
        joinColumn: {
            name: 'menu_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: Role[];

    @ManyToOne(() => Menu, (menu) => menu.children, { nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent: Menu;

    @OneToMany(() => Menu, (menu) => menu.parent)
    children: Menu[];
}