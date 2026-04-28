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
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create user baru' })
    @ApiOkResponse({
        description: 'User berhasil dibuat',
        schema: {
            example: {
                statusCode: 201,
                message: 'User berhasil dibuat',
                data: {
                    id: 1,
                    username: 'admin',
                },
            },
        },
    })
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Ambil semua user' })
    @ApiOkResponse({
        description: 'List user berhasil diambil',
        schema: {
            example: {
                statusCode: 200,
                message: 'List user berhasil diambil',
                data: [
                    {
                        id: 1,
                        username: 'admin',
                    },
                ],
            },
        },
    })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Ambil detail user' })
    @ApiOkResponse({
        description: 'Detail user berhasil diambil',
        schema: {
            example: {
                statusCode: 200,
                message: 'Detail user berhasil diambil',
                data: {
                    id: 1,
                    username: 'admin',
                },
            },
        },
    })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiOkResponse({
        description: 'User berhasil diupdate',
        schema: {
            example: {
                statusCode: 200,
                message: 'User berhasil diupdate',
                data: {
                    id: 1,
                    username: 'admin-update',
                },
            },
        },
    })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
    ) {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Hapus user' })
    @ApiOkResponse({
        description: 'User berhasil dihapus',
        schema: {
            example: {
                statusCode: 200,
                message: 'User berhasil dihapus',
                data: null,
            },
        },
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}