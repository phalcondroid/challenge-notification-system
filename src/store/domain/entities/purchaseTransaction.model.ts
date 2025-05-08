import { Inventory } from "../../../shared/contracts/store/domain/entities/inventory";
import { PurchaseTransaction } from "../../../shared/contracts/store/domain/entities/purchaseTransaction";
import { Receipt } from "../../../shared/contracts/store/domain/entities/receipt";
import { Store } from "../../../shared/contracts/store/enums/store.enum";
import { TransactionStatus } from "../../../shared/contracts/store/enums/transactionStatus.enum";

export class PurchaseTransactionModel implements PurchaseTransaction {
  purchaseTransactionId: string;
  inventory: Inventory;
  userId: string;
  receipt: Receipt;
  status: TransactionStatus;
  store: Store;
}