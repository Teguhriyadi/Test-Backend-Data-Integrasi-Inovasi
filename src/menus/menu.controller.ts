import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

import { MenuService } from './menu.service';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CreateMenuDto } from './dto/create-menu.dto';

interface AuthRequest extends Request {
    user: JwtPayload;
}

@ApiTags('Menu')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Get()
    @ApiOperation({ summary: 'Get menu berdasarkan role user login' })
    @ApiOkResponse({
        description: 'Menu berdasarkan role berhasil diambil',
        schema: {
            example: {
                statusCode: 200,
                message: 'Menu berdasarkan role berhasil diambil',
                data: [
                    {
                        id: 1,
                        name: 'Menu 1',
                        path: '/menu-1',
                        children: [],
                    },
                ],
            },
        },
    })
    getMenu(@Req() req: AuthRequest) {
        if (!req.user?.roleId) {
            throw new UnauthorizedException('Role tidak ditemukan di token');
        }

        return this.menuService.getMenuByRole(req.user.roleId);
    }

    @Post()
    @ApiOperation({ summary: 'Create menu baru' })
    @ApiOkResponse({
        schema: {
            example: {
                statusCode: 201,
                message: 'Menu berhasil dibuat',
                data: {
                    id: 1,
                    name: 'Menu 1',
                    path: '/menu-1',
                },
            },
        },
    })
    create(@Body() dto: CreateMenuDto) {
        return this.menuService.create(dto);
    }

    @Get('all')
    @ApiOperation({ summary: 'Get semua menu (tree full)' })
    @ApiOkResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Menu berhasil diambil',
                data: [],
            },
        },
    })
    findAll() {
        return this.menuService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get detail menu' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.menuService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update menu' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateMenuDto,
    ) {
        return this.menuService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Hapus menu' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.menuService.remove(id);
    }
}