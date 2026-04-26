import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { MenuService } from './menu.service';
import { JwtPayload } from '../auth/types/jwt-payload.type';

interface AuthRequest extends Request {
    user: JwtPayload;
}

@Controller('menu')
@UseGuards(AuthGuard('jwt'))
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Get()
    getMenu(@Req() req: AuthRequest) {
        return this.menuService.getMenuByUser(req.user.userId);
    }
}