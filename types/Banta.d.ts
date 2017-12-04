import { ClientOptions } from "./Client";
import * as InputInterface from "./InputInterface";
import * as BantaInterface from "./BantaInterface";
import * as MantaInterface from "./MantaInterface";
export interface BantaOptions {
    client: ClientOptions;
}
export declare class Banta {
    private readonly client;
    constructor(options: BantaOptions);
    readonly host: string;
    readonly user: string;
    readonly subuser: string | undefined;
    readonly homePath: string;
    readonly jobPath: string;
    convertDoubleTildaToHomePath(path: string): string;
    convertJobIdToJobPath(id: string): string;
    /**
     * Lists the contents of a directory
     */
    listDirectory(path: string, options?: InputInterface.ListDirectoryOptions): Promise<BantaInterface.ListDirectory[]>;
    /**
     * Deletes a directory
     */
    deleteDirectory(path: string): Promise<void>;
    /**
     * Puts a directory
     */
    putDirectory(path: string): Promise<void>;
    /**
     * Retrieves an object from the service
     */
    getObject<T = any>(path: string): Promise<T>;
    /**
     * Deletes an object from the service
     */
    deleteObject(path: string): Promise<void>;
    /**
     * Creates a SnapLink to an object
     */
    createSnapLink(targetObjectPath: string, newLinkPath: string): Promise<void>;
    /**
     * Submits a new job to be executed
     */
    createJob(config: InputInterface.CreateJobDocument | InputInterface.CreateJobShorthand): Promise<string>;
    /**
     * Submits inputs to an already created job
     */
    addJobInput(path: string, input: string | ReadonlyArray<string>): Promise<void>;
    /**
     * This "closes" input for a job, and will finalise the job
     */
    endJobInput(path: string): Promise<void>;
    /**
     * This cancels a job from doing any further work
     */
    cancelJob(path: string): Promise<void>;
    /**
     * Returns the list of jobs you currently have
     */
    listJobs(options?: InputInterface.ListJobsOptions): Promise<BantaInterface.ListDirectory[]>;
    /**
     * Gets the high-level job container object
     */
    getJob(path: string, getArchivedInfo?: boolean): Promise<BantaInterface.GetJob[]>;
    /**
     * Returns the current "live" set of outputs from a job
     */
    getJobOutput(path: string, getArchivedInfo?: boolean): Promise<string[]>;
    /**
     * Returns the current "live" set of inputs to a job
     */
    getJobInput(path: string, getArchivedInfo?: boolean): Promise<string[]>;
    /**
     * Returns the current "live" set of failures from a job
     */
    getJobFailures(path: string, getArchivedInfo?: boolean): Promise<string[]>;
    /**
     * Returns the current "live" set of errors from a job
     */
    getJobErrors(path: string, getArchivedInfo?: boolean): Promise<MantaInterface.GetJobErrors[]>;
    getArchivedJobRaw(path: string): Promise<any>;
    getArchivedJobOutputRaw(path: string): Promise<any>;
    getArchivedJobInputRaw(path: string): Promise<any>;
    getArchivedJobFailuresRaw(path: string): Promise<any>;
    getArchivedJobErrorsRaw(path: string): Promise<any>;
}
