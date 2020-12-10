export interface IProduct {
    id: number;
    name: string;
    price: number;
    actualCost: number;
    imageUrl: string;
    details: string;
    colorId: number;
    color: {
        colorName: string;
    }
    sizeId: number;
    size: {
        sizeName: string;
    }
    materialId: number;
    material: {
        materialName: string;
    }
}
