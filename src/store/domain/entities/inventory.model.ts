import { Inventory } from "../../../shared/contracts/store/domain/entities/inventory";

class InventoryModel implements Inventory {
  id: string;
  sku: string;
  name: string;
  price: number;
  createAt: Date;
  updatedAt: Date;
}