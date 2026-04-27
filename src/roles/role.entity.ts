import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-roles/user-roles.entity';
import { Menu } from 'src/menus/menu.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus: Menu[];

  @OneToMany(() => UserRole, (ur) => ur.role)
  userRoles: UserRole[];
}