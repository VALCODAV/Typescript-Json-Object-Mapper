import "reflect-metadata";
import { JsonView } from '../JsonView';

interface IJsonPropertyStored {
    view?: typeof JsonView | [typeof JsonView];
    type?: "string" | "number" | "array" | "object" | "date" | "boolean";
    name?: string;

    enum?: (string|number|boolean)[];
    validator?: RegExp | string;
    format?: string;
    required?: boolean;
}
export interface IJsonProperty {
    name?: string;
    view?: [typeof JsonView]|typeof JsonView;
    type?: "string" | "number" | "array" | "object" | "date" | "boolean";

    enum?: (string|number|boolean)[];
    validator?: RegExp | string;
    format?: string;
    required?: boolean;
}
export function JsonProperty (options: IJsonProperty): Function;
export function JsonProperty(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;
export function JsonProperty(): Function;
export function JsonProperty (...args: any[]): void | Function {
    const KEY = "JSON:PROPERTY";
    if (args.length > 2) {
        const designType  = Reflect.getMetadata("design:type", args[0], args[1]);
        let pre: { [key: string]: IJsonPropertyStored } = Reflect.getMetadata(KEY, args[0]) || {};
        pre[args[1]] = {
            name: args[1],
            type: designType.name.toLowerCase(),
            view: designType.name
        };
        Reflect.defineMetadata(KEY, pre, args[0]);
        return void 0;
    }
    else {
        return (...params: any[]) => {
            const designType  = Reflect.getMetadata("design:type", params[0], params[1]);
            const options: IJsonProperty = args[0];
            let pre: { [key: string]: IJsonPropertyStored } = Reflect.getMetadata(KEY, params[0]) || {};
            pre[params[1]] = {
                view: designType.name,
                type: designType.name,
                name: params[1],
                ...options
            };
            Reflect.defineMetadata(KEY, pre, params[0]);
        };
    }
}
