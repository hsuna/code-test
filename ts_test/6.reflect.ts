import 'reflect-metadata'

let meta = function (target: any, propertyKey: string) {

    // 获取成员类型
    let type = Reflect.getMetadata('design:type', target, propertyKey)
    // 获取成员参数类型
    let paramtypes = Reflect.getMetadata('design:paramtypes', target, propertyKey)
    // 获取成员返回类型
    let returntype = Reflect.getMetadata('design:returntype', target, propertyKey)
    // 获取所有元数据 key (由 TypeScript 注入)
    let keys = Reflect.getMetadataKeys(target, propertyKey)
  
  
    console.log(keys) // [ 'design:returntype', 'design:paramtypes', 'design:type' ]
    // 成员类型
    console.log(type) // Function
    // 参数类型
    console.log(paramtypes) // [String]
    // 成员返回类型
    console.log(returntype) // String
  }
  
  
class User {
    // 使用这个装饰器就可以反射出成员详细信息
    @meta
    say (myName: string): string {
      return `hello, ${myName}`
    }
}