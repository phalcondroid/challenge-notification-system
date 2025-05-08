import { Receipt } from "../../shared/contracts/store/domain/entities/receipt";
import { ItemDoesNotExistError } from "../../shared/contracts/store/domain/exceptions/itemDoesNotExistError";
import { ReceiptStatus } from "../../shared/contracts/store/enums/receiptStatus.enum";
import { Store } from "../../shared/contracts/store/enums/store.enum";
import { PurchasesRepository } from "../../shared/contracts/store/infrastructure/purchases.repository";
import { BuyItemUseCase } from "../../store/domain/useCases/buyItemUseCase";
import { ValidateReceiptUseCase } from "../../store/domain/useCases/validateReceiptUseCase";

describe("BuyItemUseCase", () => {
  let purchaseRepo: jest.Mocked<PurchasesRepository>;
  let validateReceipt: jest.Mocked<ValidateReceiptUseCase>;
  let useCase: BuyItemUseCase;

  beforeEach(() => {
    // Given
    purchaseRepo = {
      getItemById: jest.fn(),
      buyItem: jest.fn()
    } as any;
    validateReceipt = { call: jest.fn() } as any;
    useCase = new BuyItemUseCase(purchaseRepo, validateReceipt);
  });

  it("should throw error if item does not exist", () => {
    // Given
    purchaseRepo.getItemById.mockReturnValue(null);

    // Then
    expect(() => useCase.call({ store: Store.google, inventoryId: "bad-id", userId: "1" }))
      .toThrow(ItemDoesNotExistError);
  });

  it("should validate receipt and process transaction", () => {
    // Given
    const receipt = {
      id: "receipt-001",
      sku: "SKU-ABC",
      inventoryId: "inventory-123",
      date: new Date("2023-01-01T00:00:00Z"),
      status: ReceiptStatus.valid,
    };
    const inventory = purchaseRepo.getItemById("1");
    const receiptResponse = validateReceipt.call({sku: receipt.sku, store: Store.apple});

    // When
    purchaseRepo.buyItem(Store.apple, inventory, receiptResponse.receipt);
    const result = useCase.call({ store: Store.google, inventoryId: "inv-1", userId: "1" });

    // Then
    expect(validateReceipt.call).toHaveBeenCalledWith({ sku: "sku-123", store: Store.google });
    expect(result).toEqual({ transaction: "tx-001" });
  });
});
