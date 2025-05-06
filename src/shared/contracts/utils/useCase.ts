export interface UseCase<RequestT, ResponseT> {
  call(request: RequestT): ResponseT;
}