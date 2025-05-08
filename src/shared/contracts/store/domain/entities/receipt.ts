import { ReceiptStatus } from "../../enums/receiptStatus.enum";

export interface Receipt {
  id: string;
  sku: string;
  inventoryId: string;
  date: Date,
  status: ReceiptStatus
}