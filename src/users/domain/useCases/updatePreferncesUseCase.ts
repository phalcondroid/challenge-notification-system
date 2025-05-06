import { UseCase } from "../../../shared/contracts/domain/useCase";
import { injectable } from "../../../shared/decorators/di";

@injectable()
export class UpdatePreferencesUseCase implements UseCase<any, boolean> {
  
  call(request: any) {
    return false;
  }
}