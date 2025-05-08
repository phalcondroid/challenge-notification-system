import { Receipt } from "../../../shared/contracts/store/domain/entities/receipt";
import { ReceiptStatus } from "../../../shared/contracts/store/enums/receiptStatus.enum";

export class ReceiptModel implements Receipt {
  id: string;
  sku: string;
  inventoryId: string;
  date: Date;
  status: ReceiptStatus;
}