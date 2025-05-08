import { injectable } from "../../../shared/decorators/di";
import { post } from "../../../shared/decorators/http";
import { PurchaseRequest } from "../../domain/request/purchaseRequest";
import { ReceiptRequest } from "../../domain/request/receiptRequest";
import { PurchaseResponse } from "../../domain/responses/purchaseResponse";
import { ReceiptResponse } from "../../domain/responses/receiptResponse";
import { BuyItemUseCase } from "../../domain/useCases/buyItemUseCase";
import { ValidateReceiptUseCase } from "../../domain/useCases/validateReceiptUseCase";

@injectable()
export class BuyController {

  constructor(
    private readonly buyUseCase: BuyItemUseCase,
    private readonly validatorUseCase: ValidateReceiptUseCase
  ) {}

  /**
   * Receive http payload when user wants to buy an item
   * @param request 
   * @returns 
   */
  @post()
  public buyItem(request: PurchaseRequest): PurchaseResponse {
    return this.buyUseCase.call(request);
  }

  /**
   * Receive http payload when store wants to validate statuses
   * @param request 
   * @returns 
   */
  @post()
  public validateReceipt(request: ReceiptRequest): ReceiptResponse {
    return this.validatorUseCase.call(request);
  }
}