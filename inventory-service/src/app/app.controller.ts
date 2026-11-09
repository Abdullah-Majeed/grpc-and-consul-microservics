import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('InventoryService', 'CheckStock')
  checkStock(data: { productId: string }): { availableQuantity: number; inStock: boolean } {
    const items: Record<string, number> = {
      'product-1': 10,
      'product-2': 0,
      'product-3': 5,
    };
    const qty = items[data.productId] || 0;
    return { availableQuantity: qty, inStock: qty > 0 };  
  }
}
