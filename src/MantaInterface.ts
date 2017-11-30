export interface ListDirectory {
    type: "directory" | "object",
    name: string,
    mtime: string,
    size?: number,
    etag?: string,
}
