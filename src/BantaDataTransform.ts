import { DataHydrationTransform } from "./DataHelper";
import * as MantaInterface from "./MantaInterface";

export const ListDirectory: DataHydrationTransform<MantaInterface.ListDirectory> = {
    mtime: x => new Date(x),
};

export const GetJob: DataHydrationTransform<MantaInterface.GetJob> = {
    timeCreated: x => new Date(x),
    timeDone: x => new Date(x),
    timeArchiveStarted: x => new Date(x),
    timeArchiveDone: x => new Date(x),
};
