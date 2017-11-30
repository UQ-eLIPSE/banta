# banta
A better JavaScript SDK for Manta

## Installation
```
npm install UQ-eLIPSE/banta
```

## Usage
```javascript
/// Importing

// ES Modules style
import { Banta } from "banta";

// CommonJS style
const Banta = require("banta").Banta;


/// In your code...

// Set up client
const manta = new Banta({
    client: {
        host: "https://manta.your.server.net",
        user: "username",
        subuser: "subusername",         // (Optional)
        signing: {
            key: fs.readFileSync("/path/to/your/ssh/key", "utf-8"),
            keyFingerprint: "00:11:22:33:44:55:66:77:88:99:aa:bb:cc:dd:ee:ff",
        },
    }
});

// Work with Manta:

manta.listDirectory("~~")
    .then((items) => {
        items.forEach((item) => {
            // Do something with each item
        });
    });

manta.deleteDirectory("~~/stor/some-directory")
    .then(() => {
        // Do something after deletion success
    });
```

## Methods

Returned objects generally follow the same interface as the returned JSON data
as described in [the REST API documentation](https://apidocs.joyent.com/manta/api.html).

### `Banta.prototype.listDirectory(path)`
### `Banta.prototype.deleteDirectory(path)`
### `Banta.prototype.putDirectory(path)`
### `Banta.prototype.deleteObject(path)`
### `Banta.prototype.createSnapLink(targetObjectPath, newLinkPath)`

## Notes

### In progress work

This package is very much not complete and does not support all Manta calls.

### TypeScript support

Because `banta` is written in TypeScript and exports declaration files, you
should get type support automatically.

### Promises

This package is built around Promises, so you will need to provide a polyfilled
Promise if this is not available in your environment.
