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
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @ApiOperation({ summary: 'Create role baru' })
    @ApiOkResponse({
        description: 'Role berhasil dibuat',
        schema: {
            example: {
                statusCode: 201,
                message: 'Role berhasil dibuat',
                data: {
                    id: 1,
                    name: 'admin',
                },
            },
        },
    })
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Ambil semua role' })
    @ApiOkResponse({
        description: 'List role berhasil diambil',
        schema: {
            example: {
                statusCode: 200,
                message: 'List role berhasil diambil',
                data: [
                    {
                        id: 1,
                        name: 'admin',
                    },
                ],
            },
        },
    })
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Ambil detail role' })
    @ApiOkResponse({
        description: 'Detail role berhasil diambil',
        schema: {
            example: {
                statusCode: 200,
                message: 'Detail role berhasil diambil',
                data: {
                    id: 1,
                    name: 'admin',
                },
            },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update role' })
    @ApiOkResponse({
        description: 'Role berhasil diupdate',
        schema: {
            example: {
                statusCode: 200,
                message: 'Role berhasil diupdate',
                data: {
                    id: 1,
                    name: 'admin-update',
                },
            },
        },
    })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRoleDto,
    ) {
        return this.roleService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Hapus role' })
    @ApiOkResponse({
        description: 'Role berhasil dihapus',
        schema: {
            example: {
                statusCode: 200,
                message: 'Role berhasil dihapus',
                data: null,
            },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.remove(id);
    }

    @Post(':id/menus')
    @ApiOperation({ summary: 'Assign menu ke role' })
    @ApiOkResponse({
        description: 'Menu berhasil di-assign ke role',
        schema: {
            example: {
                statusCode: 200,
                message: 'Menu berhasil di-assign ke role',
                data: {
                    roleId: 1,
                    menuIds: [1, 2, 3],
                },
            },
        },
    })
    assignMenus(
        @Param('id', ParseIntPipe) roleId: number,
        @Body() dto: { menuIds: number[] },
    ) {
        return this.roleService.assignMenus(roleId, dto.menuIds);
    }
}