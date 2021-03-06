
declare type BaseTypes = string | number | boolean;

declare type CollectionTypes = IterableCollections | WeakCollections;

export declare function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>;

export declare function computed<T>(options: WritableComputedOptions<T>): WritableComputedRef<T>;

export declare type ComputedGetter<T> = (ctx?: any) => T;

export declare interface ComputedRef<T = any> extends WritableComputedRef<T> {
    readonly value: T;
}

export declare type ComputedSetter<T> = (v: T) => void;

export declare function customRef<T>(factory: CustomRefFactory<T>): Ref<T>;

declare type CustomRefFactory<T> = (track: () => void, trigger: () => void) => {
    get: () => T;
    set: (value: T) => void;
};

export declare type DebuggerEvent = {
    effect: ReactiveEffect;
    target: object;
    type: TrackOpTypes | TriggerOpTypes;
    key: any;
} & DebuggerEventExtraInfo;

declare interface DebuggerEventExtraInfo {
    newValue?: any;
    oldValue?: any;
    oldTarget?: Map<any, any> | Set<any>;
}

declare type Dep = Set<ReactiveEffect>;

export declare function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions): ReactiveEffect<T>;

export declare function enableTracking(): void;

export declare function isProxy(value: unknown): boolean;

export declare function isReactive(value: unknown): boolean;

export declare function isReadonly(value: unknown): boolean;

export declare function isRef<T>(r: Ref<T> | unknown): r is Ref<T>;

declare type IterableCollections = Map<any, any> | Set<any>;

export declare const ITERATE_KEY: unique symbol;

export declare function markRaw<T extends object>(value: T): T;

export declare function pauseTracking(): void;

export declare function reactive<T extends object>(target: T): UnwrapNestedRefs<T>;

export declare interface ReactiveEffect<T = any> {
    (...args: any[]): T;
    _isEffect: true;
    id: number;
    active: boolean;
    raw: () => T;
    deps: Array<Dep>;
    options: ReactiveEffectOptions;
}

export declare interface ReactiveEffectOptions {
    lazy?: boolean;
    computed?: boolean;
    scheduler?: (job: ReactiveEffect) => void;
    onTrack?: (event: DebuggerEvent) => void;
    onTrigger?: (event: DebuggerEvent) => void;
    onStop?: () => void;
}

export declare const enum ReactiveFlags {
    skip = "__v_skip",
    isReactive = "__v_isReactive",
    isReadonly = "__v_isReadonly",
    raw = "__v_raw",
    reactive = "__v_reactive",
    readonly = "__v_readonly"
}

export declare function readonly<T extends object>(target: T): Readonly<UnwrapNestedRefs<T>>;

const RefSymbol = Symbol()
export declare interface Ref<T = any> {
     /**
   * @internal
   * Type differentiator only.
   * We need this to be in public d.ts but don't want it to show up in IDE
   * autocomplete, so we use a private Symbol instead.
   */
    __v_isRef: true
    // [RefSymbol]: true
    value: T;
}

export declare function ref<T extends object>(value: T): T extends Ref ? T : Ref<UnwrapRef<T>>;

export declare function ref<T>(value: T): Ref<UnwrapRef<T>>;

export declare function ref<T = any>(): Ref<T | undefined>;

/**
 * This is a special exported interface for other packages to declare
 * additional types that should bail out for ref unwrapping. For example
 * \@vue/runtime-dom can declare it like so in its d.ts:
 *
 * ``` ts
 * declare module '@vue/reactivity' {
 *   export interface RefUnwrapBailTypes {
 *     runtimeDOMBailTypes: Node | Window
 *   }
 * }
 * ```
 *
 * Note that api-extractor somehow refuses to include `decalre module`
 * augmentations in its generated d.ts, so we have to manually append them
 * to the final generated d.ts in our build process.
 */
export declare interface RefUnwrapBailTypes {
}

export declare function resetTracking(): void;

export declare function shallowReactive<T extends object>(target: T): T;

export declare function shallowReadonly<T extends object>(target: T): Readonly<{
    [K in keyof T]: UnwrapNestedRefs<T[K]>;
}>;

export declare function shallowRef<T>(value: T): T extends Ref ? T : Ref<T>;

export declare function shallowRef<T = any>(): Ref<T | undefined>;

declare function stop_2(effect: ReactiveEffect): void;
export { stop_2 as stop }

declare type SymbolExtract<T> = (T extends {
    [Symbol.asyncIterator]: infer V;
} ? {
    [Symbol.asyncIterator]: V;
} : {}) & (T extends {
    [Symbol.hasInstance]: infer V;
} ? {
    [Symbol.hasInstance]: V;
} : {}) & (T extends {
    [Symbol.isConcatSpreadable]: infer V;
} ? {
    [Symbol.isConcatSpreadable]: V;
} : {}) & (T extends {
    [Symbol.iterator]: infer V;
} ? {
    [Symbol.iterator]: V;
} : {}) & (T extends {
    [Symbol.match]: infer V;
} ? {
    [Symbol.match]: V;
} : {}) & (T extends {
    [Symbol.matchAll]: infer V;
} ? {
    [Symbol.matchAll]: V;
} : {}) & (T extends {
    [Symbol.replace]: infer V;
} ? {
    [Symbol.replace]: V;
} : {}) & (T extends {
    [Symbol.search]: infer V;
} ? {
    [Symbol.search]: V;
} : {}) & (T extends {
    [Symbol.species]: infer V;
} ? {
    [Symbol.species]: V;
} : {}) & (T extends {
    [Symbol.split]: infer V;
} ? {
    [Symbol.split]: V;
} : {}) & (T extends {
    [Symbol.toPrimitive]: infer V;
} ? {
    [Symbol.toPrimitive]: V;
} : {}) & (T extends {
    [Symbol.toStringTag]: infer V;
} ? {
    [Symbol.toStringTag]: V;
} : {}) & (T extends {
    [Symbol.unscopables]: infer V;
} ? {
    [Symbol.unscopables]: V;
} : {});

export declare function toRaw<T>(observed: T): T;

export declare function toRef<T extends object, K extends keyof T>(object: T, key: K): Ref<T[K]>;

export declare type ToRefs<T = any> = {
    [K in keyof T]: Ref<T[K]>;
};

export declare function toRefs<T extends object>(object: T): ToRefs<T>;

export declare function track(target: object, type: TrackOpTypes, key: unknown): void;

export declare const enum TrackOpTypes {
    GET = "get",
    HAS = "has",
    ITERATE = "iterate"
}

export declare function trigger(target: object, type: TriggerOpTypes, key?: unknown, newValue?: unknown, oldValue?: unknown, oldTarget?: Map<unknown, unknown> | Set<unknown>): void;

export declare const enum TriggerOpTypes {
    SET = "set",
    ADD = "add",
    DELETE = "delete",
    CLEAR = "clear"
}

export declare function triggerRef(ref: Ref): void;

export declare function unref<T>(ref: T): T extends Ref<infer V> ? V : T;

declare type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>;

declare type UnwrappedObject<T> = {
    [P in keyof T]: UnwrapRef<T[P]>;
} & SymbolExtract<T>;

export declare type UnwrapRef<T> = T extends ComputedRef<infer V> ? UnwrapRefSimple<V> : T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>;

declare type UnwrapRefSimple<T> = T extends Function | CollectionTypes | BaseTypes | Ref | RefUnwrapBailTypes[keyof RefUnwrapBailTypes] ? T : T extends Array<any> ? T : T extends object ? UnwrappedObject<T> : T;

declare type WeakCollections = WeakMap<any, any> | WeakSet<any>;

export declare interface WritableComputedOptions<T> {
    get: ComputedGetter<T>;
    set: ComputedSetter<T>;
}

export declare interface WritableComputedRef<T> extends Ref<T> {
    readonly effect: ReactiveEffect<T>;
}

export { }
