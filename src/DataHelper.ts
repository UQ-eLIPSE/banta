export interface DataHydrationTransform {
    [key: string]: (value: any) => any,
}

export namespace DataHelper {
    export function objectTransform<T extends { [key: string]: any }, U extends {[K in keyof T]: any}>(transform: DataHydrationTransform, data: T, ignoreUndefinedSourceValues: boolean = true) {
        const keys = Object.keys(transform);

        // Set up object to merge over data object
        const mergeObject: { [key: string]: any } = {};

        // For each transformation, save the result into the merge object
        keys.forEach((key) => {
            const sourceValue = data[key];

            // Ignore `undefined` if `ignoreUndefinedSourceValues` is specified
            if (ignoreUndefinedSourceValues && sourceValue === undefined) {
                return;

            }

            // Set transformed value into merge object
            mergeObject[key] = transform[key](sourceValue);
        });

        // Return new shallow copied and merged object
        return { ...data as any, ...mergeObject } as U;
    }
}
