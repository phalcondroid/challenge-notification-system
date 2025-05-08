import { Store } from "../../../shared/contracts/store/enums/store.enum";

export interface PurchaseRequest {
  userId: string;
  inventoryId: string;
  store: Store
}