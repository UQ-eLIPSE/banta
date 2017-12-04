export interface ListDirectory {
    type: "directory" | "object";
    name: string;
    mtime: string;
    size?: number;
    etag?: string;
}
export interface GetJob {
    id: string;
    name: string;
    state: string;
    cancelled: boolean;
    inputDone: boolean;
    timeCreated: string;
    timeDone: string;
    timeArchiveStarted: string;
    timeArchiveDone: string;
    transient: boolean;
    phases: JobPhase[];
    options: {
        [key: string]: any;
    };
}
export interface JobPhase {
    /** One of: `map` or `reduce` */
    type?: "map" | "reduce";
    /** An array of objects to be placed in your compute zones */
    assets?: ReadonlyArray<string>;
    /**
     * The actual (shell) statement to execute
     *
     * `exec` may be any valid shell command, including pipelines and other
     * shell syntax. You can also execute programs stored in the service by
     * including them in `assets` and referencing them as `/assets/$manta_path`.
     */
    exec: string;
    /**
     * Shell statement to execute in each compute zone before any tasks are
     * executed
     *
     * `init` has the same constraints as `exec`, but is executed in each
     * compute zone before any tasks run.
     */
    init?: string;
    /**
     * An optional number of reducers for this phase (reduce-only)
     *
     * Default is `1`.
     *
     * `count` has a minimum of `1` (default), and a maximum of `1024`.
     */
    count?: number;
    /**
     * An optional amount of DRAM to give to your compute zone (MB)
     *
     * `memory` must be one of the following:
     * - `256`
     * - `512`
     * - `1024`
     * - `2048`
     * - `4096`
     * - `8192`
     */
    memory?: 256 | 512 | 1024 | 2048 | 4096 | 8192;
    /**
     * An optional amount of disk space to give to your compute zones (GB)
     *
     * `disk` must be one of the following:
     * - `2`
     * - `4`
     * - `8`
     * - `16`
     * - `32`
     * - `64`
     * - `128`
     * - `256`
     * - `512`
     * - `1024`
     */
    disk?: 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024;
}
export interface GetJobErrors {
    taskId?: string;
    phaseNum: string | number;
    what: string;
    code: string;
    message: string;
    server?: string;
    machine?: string;
    input?: string;
    p0input?: string;
    core?: string;
    stderr?: string;
}
