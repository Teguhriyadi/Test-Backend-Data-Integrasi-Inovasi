import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user-roles')
export class UserRolesController {
    constructor(private readonly service: UserRolesService) { }

    @Post('assign')
    async assign(@Body() dto: AssignRoleDto) {
        const result = await this.service.assign(dto);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Role berhasil di-assign',
            data: result,
        };
    }
}