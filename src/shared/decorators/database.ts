export interface DatabaseClient {
  save(a: any): any;
  get(a: any): any;
  update(id: any, a: any): any;
}