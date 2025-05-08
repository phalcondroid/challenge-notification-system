export function injectable() {
  return function (target) {} 
}

export function Inject(attr: any): PropertyDecorator & ParameterDecorator {
  return (target: Object, propertyKey: string | symbol) => null;
}