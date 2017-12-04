import * as MantaInterface from "./MantaInterface";
export interface ListDirectory {
    type: "directory" | "object";
    name: string;
    mtime: Date;
    size?: number;
    etag?: string;
}
export interface GetJob {
    id: string;
    name: string;
    state: string;
    cancelled: boolean;
    inputDone: boolean;
    timeCreated: Date;
    timeDone: Date;
    timeArchiveStarted: Date;
    timeArchiveDone: Date;
    transient: boolean;
    phases: MantaInterface.JobPhase[];
    options: {
        [key: string]: any;
    };
}
