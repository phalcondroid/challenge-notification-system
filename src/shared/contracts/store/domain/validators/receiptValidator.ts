export interface ReceiptValidator {
  validate(sku: string): boolean;
}