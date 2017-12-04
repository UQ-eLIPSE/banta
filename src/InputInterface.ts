import { QueryParameters } from "./Client";

import * as MantaInterface from "./MantaInterface";

export interface ListDirectoryOptions extends QueryParameters {
    /** Limits the number of records to come back (default and max is 1000) */
    limit: number,
    /** Key name at which to start the next listing */
    marker: string,
}

export interface CreateJobDocument {
    /** An arbitrary name for this job */
    name?: string,
    /** Tasks to execute as part of this job */
    phases: ReadonlyArray<CreateJobPhase>,
}

export type CreateJobShorthand =
    CreateJobShorthandString |
    CreateJobShorthandStringArray;

export type CreateJobShorthandString = string;
export type CreateJobShorthandStringArray = ReadonlyArray<string>;

export function isCreateJobShorthandStringArray(o: any): o is CreateJobShorthandStringArray {
    return Array.isArray(o);
}

export type CreateJobPhase = MantaInterface.JobPhase;

export interface ListJobsOptions extends QueryParameters {
    state: string,
}
