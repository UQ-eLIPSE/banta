export interface ListDirectory {
    type: "directory" | "object",
    name: string,
    mtime: Date,
    size?: number,
    etag?: string,
}
