import { UseCase } from "../../../shared/contracts/domain/useCase";
import { ItemDoesNotExistError } from "../../../shared/contracts/store/domain/exceptions/itemDoesNotExistError";
import { ReceiptError } from "../../../shared/contracts/store/domain/exceptions/receiptError";
import { ReceiptValidator } from "../../../shared/contracts/store/domain/validators/receiptValidator";
import { Store } from "../../../shared/contracts/store/enums/store.enum";
import { PurchasesRepository } from "../../../shared/contracts/store/infrastructure/purchases.repository";
import { Inject, injectable } from "../../../shared/decorators/di";
import { AppleReceiptValidator } from "../../infra/adapters/appleReceiptValidator";
import { GamepassReceiptValidator } from "../../infra/adapters/gamepassReceiptValidator";
import { GoogleReceiptValidator } from "../../infra/adapters/googleReceiptValidator";
import { ReceiptRequest } from "../request/receiptRequest";
import { ReceiptResponse } from "../responses/receiptResponse";

/**
 * Business logic to validate specific repository receipt
 */
@injectable()
export class ValidateReceiptUseCase implements UseCase<ReceiptRequest, ReceiptResponse> {

  /**
   * Injection through dependency injector
   */
  constructor(
    private readonly purchaseRepo: PurchasesRepository,
    // @Inject("Google")
    private readonly googleValidator: ReceiptValidator,
    // @Inject("Apple")
    private readonly appleValidator: ReceiptValidator,
    // @Inject("Ms")
    private readonly gamepassValidator: ReceiptValidator
  ) {}

  /**
   * Send notification request by type
   * @param Notification notificationRequest
   * @returns NotificationStatus
   */
  public call(request: ReceiptRequest): ReceiptResponse {
    const validator: ReceiptValidator = ((store: Store) => {
      if (store === Store.apple) return this.appleValidator;
      if (store === Store.google) return this.googleValidator;
      return this.gamepassValidator;
    }) (request.store);
    
    const validationReceipt = validator.validate(request.sku);
    if (!validationReceipt) {
      throw new ReceiptError();
    }

    const inventory = this.purchaseRepo.getItemBySku(request.sku);
    if (!inventory) {
      throw new ItemDoesNotExistError("inventory with '$sku' does not exist");
    }
    const receipt = this.purchaseRepo.validateReceipt(request.sku, inventory.id);
    return { receipt };
  }
}