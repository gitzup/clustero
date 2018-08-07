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

First, ensure the _dashboard_ has all its dependencies installed:

```bash
$ cd dashboard
$ npm install
$ node ./node_modules/node-sass/scripts/install.js
$ npm rebuild node-sass
```

Then ensure that the _server_ has all its dependencies installed:

```bash
$ cd server
$ npm install
```

To run the system, use `docker-compose`:

```bash
docker-compose up --abort-on-container-exit
```

## Building

Build the Docker image, as such:

```bash
docker build --tag gitzup/clustero:local .
```
