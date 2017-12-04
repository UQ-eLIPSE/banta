export declare type DataHydrationTransform<T> = {
    [K in keyof T]?: (value: any) => any;
};
export declare namespace DataHelper {
    function objectTransform<T extends {
        [key: string]: any;
    }, U extends {
        [K in keyof T]: any;
    }>(transform: DataHydrationTransform<T>, data: T, ignoreUndefinedSourceValues?: boolean): U;
}
