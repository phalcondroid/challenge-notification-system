import { Store } from "../../../shared/contracts/store/enums/store.enum";

export interface ReceiptRequest {
  sku: string;
  store: Store;
}