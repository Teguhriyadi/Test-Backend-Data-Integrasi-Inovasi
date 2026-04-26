import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity('menus')
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    @ManyToOne(() => Role, (role) => role.menus)
    @JoinColumn({ name: 'role_id' })
    role: Role;
}