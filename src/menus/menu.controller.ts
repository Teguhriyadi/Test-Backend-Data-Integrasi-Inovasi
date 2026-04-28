import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBearerAuth,
    ApiOkResponse,
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
@Controller('menu')
@UseGuards(AuthGuard('jwt'))
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Get()
    @ApiOkResponse({
        description: 'Get menu tree based on role',
        schema: {
            example: [
                {
                    id: 1,
                    name: 'Menu 1',
                    path: '/menu-1',
                    children: [
                        {
                            id: 2,
                            name: 'Menu 1.1',
                            path: '/menu-1-1',
                            children: [],
                        },
                        {
                            id: 3,
                            name: 'Menu 1.2',
                            path: '/menu-1-2',
                            children: [
                                {
                                    id: 4,
                                    name: 'Menu 1.2.1',
                                    path: '/menu-1-2-1',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    })

    getMenu(@Req() req: AuthRequest) {
        if (!req.user?.roleId) {
            throw new Error('Role tidak ditemukan di token');
        }

        return this.menuService.getMenuByRole(req.user.roleId);
    }

    @Post()
    create(@Body() dto: CreateMenuDto) {
        return this.menuService.create(dto);
    }

    @Get('all')
    findAll() {
        return this.menuService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.menuService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateMenuDto,
    ) {
        return this.menuService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.menuService.remove(id);
    }
}