import { Client, ClientOptions } from "./Client";
import { DataHelper } from "./DataHelper";
import { NDJSON } from "./NDJSON";

import * as BantaDataTransform from "./BantaDataTransform";
import * as InputInterface from "./InputInterface";

import * as BantaInterface from "./BantaInterface";
import * as MantaInterface from "./MantaInterface";

export interface BantaOptions {
    client: ClientOptions,
}

export class Banta {
    private readonly client: Client;

    constructor(options: BantaOptions) {
        this.client = new Client(options.client);
    }

    public get host() {
        return this.client.host;
    }

    public get user() {
        return this.client.user;
    }

    public get subuser() {
        return this.client.subuser;
    }

    public get homePath() {
        return `/${this.user}`;
    }

    public get jobPath() {
        return `${this.homePath}/jobs`;
    }

    public convertDoubleTildaToHomePath(path: string) {
        // Just "~~" = home folder
        if (path === "~~") {
            return this.homePath;
        }

        // References to home in a path
        if (path.substr(0, 3) === "~~/") {
            return `${this.homePath}/${path.substr(3)}`;
        }

        // Otherwise just return the path as supplied
        return path;
    }

    public convertJobIdToJobPath(id: string) {
        return `${this.jobPath}/${id}`;
    }

    /**
     * Lists the contents of a directory
     */
    public async listDirectory(path: string, options?: InputInterface.ListDirectoryOptions) {
        path = this.convertDoubleTildaToHomePath(path);

        const result = await this.client.get(path, options);

        // Parse NDJSON string result
        const directoryData = NDJSON.parse<MantaInterface.ListDirectory>(result.data);

        // Transform the `mtime` property into a Date object
        return directoryData.map((item) => {
            return DataHelper.objectTransform<MantaInterface.ListDirectory, BantaInterface.ListDirectory>(BantaDataTransform.ListDirectory, item);
        });
    }

    /**
     * Deletes a directory
     */
    public async deleteDirectory(path: string) {
        path = this.convertDoubleTildaToHomePath(path);

        await this.client.delete(path);
    }

    /**
     * Puts a directory
     */
    public async putDirectory(path: string) {
        path = this.convertDoubleTildaToHomePath(path);

        await this.client.put(path, undefined, {
            "Content-Type": "application/json; type=directory",
        });
    }

    /**
     * Retrieves an object from the service
     */
    public async getObject<T = any>(path: string) {
        path = this.convertDoubleTildaToHomePath(path);

        const result = await this.client.get(path);

        return result.data as T;
    }

    /**
     * Deletes an object from the service
     */
    public async deleteObject(path: string) {
        path = this.convertDoubleTildaToHomePath(path);

        await this.client.delete(path);
    }

    /**
     * Creates a SnapLink to an object
     */
    public async createSnapLink(targetObjectPath: string, newLinkPath: string) {
        targetObjectPath = this.convertDoubleTildaToHomePath(targetObjectPath);
        newLinkPath = this.convertDoubleTildaToHomePath(newLinkPath);

        await this.client.put(newLinkPath, undefined, {
            "Content-Type": "application/json; type=link",
            "Location": targetObjectPath,
        });
    }

    /**
     * Submits a new job to be executed
     */
    public async createJob(config: InputInterface.CreateJobDocument | InputInterface.CreateJobShorthand) {
        // Exec strings and arrays are automatically converted into the correct
        // job document

        // Wrap one-liners into array form
        if (typeof config === "string") {
            config = [config];
        }

        // Map exec string array to minimal job config
        if (InputInterface.isCreateJobShorthandStringArray(config)) {
            config = {
                phases: config.map(exec => ({ exec })),
            };
        }

        const result = await this.client.post(this.jobPath, config, {
            "Content-Type": "application/json; type=job",
        });

        // Get job path returned from Manta
        const createdJobPath: string = result.headers["Location"];

        return createdJobPath;
    }

    /**
     * Submits inputs to an already created job
     */
    public async addJobInput(path: string, input: string | ReadonlyArray<string>) {
        path = `${path}/live/in`;

        // Wrap input if just string
        if (typeof input === "string") {
            input = [input];
        }

        // Process string array as plain text input with `\n` as delimiter
        // Note that all lines have a trailing `\n`, hence the last "\n"
        // appended on the end
        const body = input.join("\n") + "\n";

        await this.client.post(path, body, {
            "Content-Type": "text/plain",
        });
    }

    /**
     * This "closes" input for a job, and will finalise the job
     */
    public async endJobInput(path: string) {
        path = `${path}/live/in/end`;

        await this.client.post(path, undefined);
    }

    /**
     * This cancels a job from doing any further work
     */
    public async cancelJob(path: string) {
        path = `${path}/live/cancel`;

        await this.client.post(path, undefined);
    }

    /**
     * Returns the list of jobs you currently have
     */
    public async listJobs(options?: InputInterface.ListJobsOptions) {
        const result = await this.client.get(this.jobPath, options);

        // TODO: Use `listDirectory()` underneath?

        // Parse NDJSON string result
        const directoryData = NDJSON.parse<MantaInterface.ListDirectory>(result.data);

        // Transform the `mtime` property into a Date object
        return directoryData.map((item) => {
            return DataHelper.objectTransform<MantaInterface.ListDirectory, BantaInterface.ListDirectory>(BantaDataTransform.ListDirectory, item);
        });
    }

    /**
     * Gets the high-level job container object
     */
    public async getJob(path: string, getArchivedInfo: boolean = true) {
        let data: any;

        try {
            data = (await this.client.get(`${path}/live/status`)).data;
        } catch (e) {
            // If 404, try archived info if option enabled
            if (getArchivedInfo &&
                e && e.response && e.response.status === 404) {
                data = await this.getArchivedJobRaw(path);
            } else {
                throw e;
            }
        }

        // Parse NDJSON string result
        const jobData = NDJSON.parse<MantaInterface.GetJob>(data);

        // Transform as required
        return jobData.map((data) => {
            return DataHelper.objectTransform<MantaInterface.GetJob, BantaInterface.GetJob>(BantaDataTransform.GetJob, data);
        });
    }

    /**
     * Returns the current "live" set of outputs from a job
     */
    public async getJobOutput(path: string, getArchivedInfo: boolean = true) {
        let data: string;

        try {
            data = (await this.client.get(`${path}/live/out`)).data;
        } catch (e) {
            // If 404, try archived info if option enabled
            if (getArchivedInfo &&
                e && e.response && e.response.status === 404) {
                data = await this.getArchivedJobOutputRaw(path);
            } else {
                throw e;
            }
        }

        // Split output paths by delimiter
        return data
            .split("\n")
            .filter(x => x.length !== 0);
    }

    /**
     * Returns the current "live" set of inputs to a job
     */
    public async getJobInput(path: string, getArchivedInfo: boolean = true) {
        let data: string;

        try {
            data = (await this.client.get(`${path}/live/in`)).data;
        } catch (e) {
            // If 404, try archived info if option enabled
            if (getArchivedInfo &&
                e && e.response && e.response.status === 404) {
                data = await this.getArchivedJobInputRaw(path);
            } else {
                throw e;
            }
        }

        // Split output paths by delimiter
        return data
            .split("\n")
            .filter(x => x.length !== 0);
    }

    /**
     * Returns the current "live" set of failures from a job
     */
    public async getJobFailures(path: string, getArchivedInfo: boolean = true) {
        let data: string;

        try {
            data = (await this.client.get(`${path}/live/fail`)).data;
        } catch (e) {
            // If 404, try archived info if option enabled
            if (getArchivedInfo &&
                e && e.response && e.response.status === 404) {
                data = await this.getArchivedJobFailuresRaw(path);
            } else {
                throw e;
            }
        }

        // Split output paths by delimiter
        return data
            .split("\n")
            .filter(x => x.length !== 0);
    }

    /**
     * Returns the current "live" set of errors from a job
     */
    public async getJobErrors(path: string, getArchivedInfo: boolean = true) {
        let data: any;

        try {
            data = (await this.client.get(`${path}/live/err`)).data;
        } catch (e) {
            // If 404, try archived info if option enabled
            if (getArchivedInfo &&
                e && e.response && e.response.status === 404) {
                data = await this.getArchivedJobRaw(path);
            } else {
                throw e;
            }
        }

        // Parse NDJSON string result
        const jobErrorData = NDJSON.parse<MantaInterface.GetJobErrors>(data);

        return jobErrorData;
    }

    public async getArchivedJobRaw(path: string) {
        return await this.getObject(`${path}/job.json`);
    }

    public async getArchivedJobOutputRaw(path: string) {
        return await this.getObject(`${path}/out.txt`);
    }

    public async getArchivedJobInputRaw(path: string) {
        return await this.getObject(`${path}/in.txt`);
    }

    public async getArchivedJobFailuresRaw(path: string) {
        return await this.getObject(`${path}/fail.txt`);
    }

    public async getArchivedJobErrorsRaw(path: string) {
        return await this.getObject(`${path}/err.txt`);
    }
}
