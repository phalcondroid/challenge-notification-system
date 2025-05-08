import { UseCase } from "../../../shared/contracts/domain/useCase";
import { ItemDoesNotExistError } from "../../../shared/contracts/store/domain/exceptions/itemDoesNotExistError";
import { PurchasesRepository } from "../../../shared/contracts/store/infrastructure/purchases.repository";
import { injectable } from "../../../shared/decorators/di";
import { PurchaseRequest } from "../request/purchaseRequest";
import { PurchaseResponse } from "../responses/purchaseResponse";
import { ValidateReceiptUseCase } from "./validateReceiptUseCase";

/**
 * Business logic to buy an item
 */
@injectable()
export class BuyItemUseCase implements UseCase<PurchaseRequest, PurchaseResponse> {

  /**
   * Injection through dependency injector
   */
  constructor(
    private readonly purchaseRepo: PurchasesRepository,
    private readonly validateReceipt: ValidateReceiptUseCase
  ) {}

  /**
   * Users buy items inte game store
   * @param PurchaseRequest request
   * @returns PurchaseResponse
   */
  public call(request: PurchaseRequest): PurchaseResponse {
    const item = this.purchaseRepo.getItemById(request.inventoryId);
    if (!item) { throw new ItemDoesNotExistError(); }
    const response = this.validateReceipt.call({ 
      sku: item.sku, 
      store: request.store 
    });
    const transaction = this.purchaseRepo.buyItem(request.store, item, response.receipt);
    return { transaction };
  }
}