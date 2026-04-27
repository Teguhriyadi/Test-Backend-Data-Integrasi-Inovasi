import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SelectRoleDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: 'UserId wajib diisi' })
    @IsNumber({}, { message: 'UserId harus berupa angka' })
    userId: number;

    @ApiProperty({ example: 2 })
    @IsNotEmpty({ message: 'RoleId wajib diisi' })
    @IsNumber({}, { message: 'RoleId harus berupa angka' })
    roleId: number;
}