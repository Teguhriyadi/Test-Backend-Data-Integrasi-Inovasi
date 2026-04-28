import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Menu } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Menu])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RolesModule { }