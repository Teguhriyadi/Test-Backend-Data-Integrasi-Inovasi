import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateMenuDto {
    @ApiProperty({ example: 'Menu Updated', required: false })
    @IsOptional()
    @IsString({ message: 'Nama menu harus string' })
    name?: string;

    @ApiProperty({ example: '/menu-updated', required: false })
    @IsOptional()
    @IsString({ message: 'Path harus string' })
    path?: string;

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsNumber({}, { message: 'parentId harus berupa angka' })
    parentId?: number;
}