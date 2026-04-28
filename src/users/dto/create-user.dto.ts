import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'admin' })
    @IsNotEmpty({ message: 'Username wajib diisi' })
    username: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty({ message: 'Password wajib diisi' })
    @MinLength(6, { message: 'Password minimal 6 karakter' })
    password: string;
}