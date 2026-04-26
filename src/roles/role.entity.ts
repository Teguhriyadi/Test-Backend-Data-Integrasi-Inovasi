import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-roles/user-roles.entity';
import { Menu } from 'src/menus/menu.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Menu, (menu) => menu.role)
  menus: Menu[];

  @OneToMany(() => UserRole, (ur) => ur.role)
  userRoles: UserRole[];
}