interface Duck {
    walk(): any;
    swim(): any;
    cry(): any;
}
declare class Bird {
    walk(): void;
    swim(): void;
    cry(): string;
}
declare let bird: Bird;
