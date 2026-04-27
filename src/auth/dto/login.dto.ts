import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'admin',
        description: 'Username user untuk login'
    })
    @IsNotEmpty({ message: 'Username wajib diisi' })
    username: string;

    @ApiProperty({
        example: '123456',
        description: 'Password minimal 6 karakter'
    })
    @IsNotEmpty({ message: 'Password wajib diisi' })
    @MinLength(6)
    password: string;
}