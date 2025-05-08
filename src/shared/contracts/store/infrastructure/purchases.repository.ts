import { Inventory } from "../domain/entities/inventory";
import { PurchaseTransaction } from "../domain/entities/purchaseTransaction";
import { Receipt } from "../domain/entities/receipt";
import { Store } from "../enums/store.enum";

export interface PurchasesRepository {
  buyItem(store: Store, item: Inventory, receipt: Receipt): PurchaseTransaction;
  validateReceipt(sku: string, inventoryId: string): Receipt;
  getItemById(id: string): Inventory;
  getItemBySku(sku: string): Inventory;
}