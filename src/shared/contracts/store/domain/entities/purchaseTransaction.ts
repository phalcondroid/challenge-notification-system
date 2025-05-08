import { Store } from "../../enums/store.enum";
import { TransactionStatus } from "../../enums/transactionStatus.enum";
import { Inventory } from "./inventory";
import { Receipt } from "./receipt";

export interface PurchaseTransaction {
  purchaseTransactionId: string;
  inventory: Inventory;
  userId: string;
  receipt: Receipt;
  status: TransactionStatus,
  store: Store
}