import { Receipt } from "../../../shared/contracts/store/domain/entities/receipt";
import { ReceiptStatus } from "../../../shared/contracts/store/enums/receiptStatus.enum";

export interface ReceiptResponse {
  receipt: Receipt
}