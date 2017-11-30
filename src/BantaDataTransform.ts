import { DataHydrationTransform } from "./DataHelper";

export const ListDirectory: DataHydrationTransform = {
    mtime: x => new Date(x),
};
