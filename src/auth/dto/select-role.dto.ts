import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SelectRoleDto {
    @ApiProperty({
        example: 2,
        description: 'ID user yang login'
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({
        example: 1,
        description: 'Role yang dipilih user'
    })
    @IsNotEmpty()
    @IsNumber()
    roleId: number;
}