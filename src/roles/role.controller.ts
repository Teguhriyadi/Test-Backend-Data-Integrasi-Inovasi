import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.create(dto);
    }

    @Get()
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRoleDto,
    ) {
        return this.roleService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.remove(id);
    }

    @Post(':id/menus')
    assignMenus(
        @Param('id', ParseIntPipe) roleId: number,
        @Body() dto: { menuIds: number[] },
    ) {
        return this.roleService.assignMenus(roleId, dto.menuIds);
    }
}