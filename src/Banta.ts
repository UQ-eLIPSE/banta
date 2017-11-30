import { Client, ClientOptions, QueryParameters } from "./Client";
import { DataHelper } from "./DataHelper";
import { NDJSON } from "./NDJSON";

import * as BantaDataTransform from "./BantaDataTransform";

import * as BantaInterface from "./BantaInterface";
import * as MantaInterface from "./MantaInterface";

export interface BantaOptions {
    client: ClientOptions,
}

export interface ListDirectoryOptions extends QueryParameters {
    /** Limits the number of records to come back (default and max is 1000) */
    limit: number,
    /** Key name at which to start the next listing */
    marker: string,
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

    public get homeFolder() {
        return `/${this.user}`;
    }

    public convertRelativeToAbsolutePath(path: string) {
        // Just "~~" = home folder
        if (path === "~~") {
            return this.homeFolder;
        }

        // References to home in a path
        if (path.substr(0, 3) === "~~/") {
            return `${this.homeFolder}/${path.substr(3)}`;
        }

        // Otherwise just return the path as supplied
        return path;
    }

    /**
     * Lists the contents of a directory
     */
    public async listDirectory(path: string, options?: ListDirectoryOptions) {
        path = this.convertRelativeToAbsolutePath(path);

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
        path = this.convertRelativeToAbsolutePath(path);

        await this.client.delete(path);
    }

    /**
     * Puts a directory
     */
    public async putDirectory(path: string) {
        path = this.convertRelativeToAbsolutePath(path);

        await this.client.put(path, undefined, {
            "Content-Type": "application/json; type=directory",
        });
    }

    /**
     * Deletes an object from the service
     */
    public async deleteObject(path: string) {
        path = this.convertRelativeToAbsolutePath(path);

        await this.client.delete(path);
    }

    /**
     * Creates a SnapLink to an object
     */
    public async createSnapLink(targetObjectPath: string, newLinkPath: string) {
        targetObjectPath = this.convertRelativeToAbsolutePath(targetObjectPath);
        newLinkPath = this.convertRelativeToAbsolutePath(newLinkPath);

        await this.client.put(newLinkPath, undefined, {
            "Content-Type": "application/json; type=link",
            "Location": targetObjectPath,
        });
    }
}
