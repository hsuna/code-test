export declare function Injectable(): (_constructor: Function) => void;
export declare function classFactory<T>(_constructor: {
    new (...args: Array<any>): T;
}): T;
