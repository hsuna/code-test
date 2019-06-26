import {queueDecorator} from './module';

function factory(target: any, name: string, method: Function): any {
  queueDecorator((store: any) => {
    store.mutations = store.mutations || {};
    store.mutations[name] = (state: any, ...args: any[]) => {
      method.apply(state, args);
    }
  });
}

export default function mutation(...opts: any[]) {
  if (typeof opts[0] === 'object') {
    return factory(opts[0], opts[1], opts[0][opts[1]]);
  } else {
    return (target: any, propKey: string) => {
      return factory(target, opts[0], target[propKey]);
    }
  }
}