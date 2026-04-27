export class MenuItemResponseDto {
    id: number;
    name: string;
    path: string;
    children: MenuItemResponseDto[];
}

export class MenuResponseDto {
    statusCode: number;
    message: string;
    data: MenuItemResponseDto[];
}