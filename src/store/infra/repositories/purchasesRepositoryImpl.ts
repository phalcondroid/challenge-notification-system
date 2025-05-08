import { v4 } from "uuid";
import { Inventory } from "../../../shared/contracts/store/domain/entities/inventory";
import { PurchaseTransaction } from "../../../shared/contracts/store/domain/entities/purchaseTransaction";
import { Store } from "../../../shared/contracts/store/enums/store.enum";
import { PurchasesRepository } from "../../../shared/contracts/store/infrastructure/purchases.repository";
import { DatabaseClient } from "../../../shared/decorators/database";
import { injectable } from "../../../shared/decorators/di";
import { ReceiptStatus } from "../../../shared/contracts/store/enums/receiptStatus.enum";
import { TransactionStatus } from "../../../shared/contracts/store/enums/transactionStatus.enum";
import { Receipt } from "../../../shared/contracts/store/domain/entities/receipt";

@injectable()
export class PurchasesRepositoryImpl implements PurchasesRepository {
  constructor(private readonly database: DatabaseClient) {}

  /**
   * Store receipt validation
   * @param string sku 
   * @returns Receipt
   */
  public validateReceipt(sku: string, inventoryId: string): Receipt {
    return {
      id: v4(),
      inventoryId,
      sku: "12345",
      date: new Date(),
      status: ReceiptStatus.valid
    };
  }

  /**
   * Save items in persistence system
   * @param Store store 
   * @param Inventory item 
   * @param Receipt receipt
   * @returns PurchaseTransaction
   */
  public buyItem(store: Store, item: Inventory, receipt: Receipt): PurchaseTransaction {
    return {
      purchaseTransactionId: v4(),
      inventory: item,
      receipt,
      userId: "123",
      status: TransactionStatus.done,
      store
    };
  }

  /**
   * Get inventory by id
   * @param string id 
   * @returns Inventory
   */
  public getItemById(id: string): Inventory {
    return {
      id: v4(),
      name: "Sword prime",
      price: 20,
      sku: "12345",
      updatedAt: new Date(),
      createAt: new Date()
    };
  }

  /**
   * Get inventory by sku
   * @param string id 
   * @returns Inventory
   */
  public getItemBySku(sku: string): Inventory {
    return {
      id: v4(),
      name: "Sword prime",
      price: 20,
      sku: "12345",
      updatedAt: new Date(),
      createAt: new Date()
    };
  }
}