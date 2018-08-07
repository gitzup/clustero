# clustero

Clustero is an opinionated broad-spectrum _DevOps Management Platform_. 

- [x] Come up with an idea. 
- [ ] Implement.
- [ ] Test [in the wild].
- [ ] Document.   
- [ ] Release. 
- [ ] Excite. 

## Development

Use `docker-compose` to start the system, as such:

```bash
docker-compose up --abort-on-container-exit \
                  --remove-orphans \
                  --force-recreate
```

It's possible that you will see this error:

```

...

 > @gitzup/clustero-dashboard@0.0.0 build-css /usr/local/app
 > node-sass-chokidar src/ -o src/
 
 fs.js:119
     throw err;
     ^
 
 Error: ENOENT: no such file or directory, scandir '/usr/local/app/node_modules/node-sass/vendor'
     at Object.readdirSync (fs.js:759:3)
     at Object.getInstalledBinaries (/usr/local/app/node_modules/node-sass/lib/extensions.js:129:13)
     at foundBinariesList (/usr/local/app/node_modules/node-sass/lib/errors.js:20:15)
     at foundBinaries (/usr/local/app/node_modules/node-sass/lib/errors.js:15:5)
     at Object.module.exports.missingBinary (/usr/local/app/node_modules/node-sass/lib/errors.js:45:5)
     at module.exports (/usr/local/app/node_modules/node-sass/lib/binding.js:15:30)
     at Object.<anonymous> (/usr/local/app/node_modules/node-sass/lib/index.js:14:35)
     at Module._compile (internal/modules/cjs/loader.js:689:30)
     at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
     at Module.load (internal/modules/cjs/loader.js:599:32)
 npm ERR! code ELIFECYCLE
 npm ERR! errno 1
 npm ERR! @gitzup/clustero-dashboard@0.0.0 build-css: `node-sass-chokidar src/ -o src/`
 npm ERR! Exit status 1
 npm ERR! 
 npm ERR! Failed at the @gitzup/clustero-dashboard@0.0.0 build-css script.
 npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

...

```

If that happens, do this:

```bash
$ cd dashboard
$ node ./node_modules/node-sass/scripts/install.js
$ npm rebuild node-sass
```

## Building

Build the Docker image, as such:

```bash
docker build --tag gitzup/clustero:local .
```
