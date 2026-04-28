import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMenuDto {
    @ApiProperty({ example: 'Menu 1' })
    @IsString({ message: 'Nama menu wajib diisi' })
    name: string;

    @ApiProperty({ example: '/menu-1' })
    @IsString({ message: 'Path wajib diisi' })
    path: string;

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsNumber({}, { message: 'parentId harus berupa angka' })
    parentId?: number;
}