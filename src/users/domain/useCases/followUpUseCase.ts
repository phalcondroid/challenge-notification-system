import { UseCase } from "../../../shared/contracts/domain/useCase";
import { UserRepository } from "../../../shared/contracts/users/repositories/userRepository";
import { injectable } from "../../../shared/decorators/di";
import { SocialRequest } from "../request/socialRequest";

@injectable()
export class followUpUseCase implements UseCase<SocialRequest, boolean> {

  constructor(private readonly repo: UserRepository) {}

  public call(request: SocialRequest): boolean {
    const user = this.repo.get(request.userDestinyId.id);
    const newFollower = this.repo.get(request.requesterId);
    return this.repo.updateFollowers(user.id, newFollower);
  }
}