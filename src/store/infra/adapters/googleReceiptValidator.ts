import { ReceiptValidator } from "../../../shared/contracts/store/domain/validators/receiptValidator";

export class GoogleReceiptValidator implements ReceiptValidator {
  /**
   * Apple validator
   * @param string sku 
   * @returns boolean
   */
  public validate(sku: string): boolean {
    return true;
  }
}