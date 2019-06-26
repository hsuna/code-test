import Reflect from 'reflect-metadata';

//ioc容器
let classPool:Array<Function> = [];

//注册该类进入容器
export function Injectable(){
    return (_constructor:Function) => {
        let paramTypes:Array<Function> = Reflect.getMetadata('design:paramtypes',_constructor)
        //已注册
        if(classPool.indexOf(_constructor) != -1) return;
        for(let val of paramTypes){
            if(val === _constructor) throw new Error('不能依赖自己')
            else if(classPool.indexOf(val) == -1) throw new Error(`${val}没有被注册`)
        }
        //注册
        classPool.push(_constructor);
    }
}

//实例化工厂
export function classFactory<T>(_constructor:{new(...args:Array<any>):T}):T{
    let paramTypes:Array<Function> = Reflect.getMetadata('design:paramtypes',_constructor)
    //参数实例化
    let paramInstance = paramTypes.map((val:Function) => {
        //依赖的类必须全部进行注册
        if(classPool.indexOf(val) == -1) throw new Error(`${val}没有被注册`)
        //参数还有依赖
        else if(val.length){
            return classFactory(val as any);
        }
        //没有依赖直接创建实例
        else{
            return new (val as any)();
        }
    })
    return new _constructor(...paramInstance);
}

type Constructor<T = any> = new (...args: any[]) => T;

const Injectable = (): ClassDecorator => target => {};

class OtherService {
  a = 1;
}

@Injectable()
class TestService {
  constructor(public readonly otherService: OtherService) {}

  testMethod() {
    console.log(this.otherService.a);
  }
}

const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target); // [OtherService]
  const args = providers.map((provider: Constructor) => new provider());
  return new target(...args);
};

Factory(TestService).testMethod(); // 1