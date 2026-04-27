import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SelectRoleDto } from "./dto/select-role.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiBody({
        type: LoginDto,
        description: 'Input username dan password untuk login'
    })
    @ApiResponse({
        status: 200,
        description: 'Login berhasil dan mengembalikan daftar role user',
        schema: {
            example: {
                userId: 1,
                roles: [
                    {
                        role_id: 1,
                        role_name: 'admin'
                    },
                    {
                        role_id: 2,
                        role_name: 'staff'
                    }
                ]
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: 'Username atau password salah',
        schema: {
            example: {
                statusCode: 401,
                message: 'Password salah',
                error: 'Unauthorized'
            }
        }
    })
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @ApiBody({
        type: SelectRoleDto,
        description: 'Pilih role setelah login untuk mendapatkan JWT token'
    })
    @ApiResponse({
        status: 200,
        description: 'Generate JWT token berdasarkan role yang dipilih',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: 'Role tidak valid atau tidak dimiliki user',
        schema: {
            example: {
                statusCode: 401,
                message: 'Role tidak valid',
                error: 'Unauthorized'
            }
        }
    })
    @Post('select-role')
    selectRole(@Body() body: SelectRoleDto) {
        return this.authService.selectRole(body);
    }
}