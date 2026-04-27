import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { MenuService } from './menu.service';
import { JwtPayload } from '../auth/types/jwt-payload.type';

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
        return this.menuService.getMenuByRole(req.user.roleId);
    }
}