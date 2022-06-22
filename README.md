# typescript-nodejs-template
API REST template for Typescript + Node.js enterprise applications with SOLID, hexagonal and ioc principles.

**Tech Stack:**

| Tech | Role | 
| --- | --- |
| **Typescript** | Programming language |
| **[express](https://expressjs.com/)** | REST API framework, responsible for routing and parsing HTTP request and responses | 
| **[tsoa](https://github.com/lukeautry/tsoa)** | Automatically registers **express** routes and generates **swagger** documentation for all the REST Controllers of the application | 
| **[InversifyJS](https://github.com/inversify/InversifyJS)** | IoC (inversion of control) framework, to manage inversion of control of dependencies |
| **[Pino](https://github.com/pinojs/pino)** | Logger |
| **Libs** | Custom libraries made by me to mantain the application |

---

## Running locally

1. Install the project dependencies, running the following on a terminal:

   ```bash
   npm install
   ```

2. Start the application:

   ```bash
   npm run start
   ```

3. The UI of the API can be found available at the following address:

   ```
   http://localhost:3000/api-docs/
   ```

The `start` command is but a shortcut that, under the hood, executes 2 other scripts:

1. `npm run routes` - Automatically registers all of express routes and generates swagger documentation.
2. `npm run dev` - Starts the [Typescript compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

If you already ran the `npm run routes` command and did not change any code from any of the Controller classes, you can finally start the application by running  `npm run dev`.

### Configuring IDE (VS Code)

Install the following extension to help you mantain the programming designs of my project.

- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

### Debugging

There is a pre-made file named `.vscode/launch.json` inside the project that will automatically configure VS Code's debugging tool. To debug the application, access the _Debug_ tab and click on "_Start and Debug_" on the top of the window.

Make sure to run `npm run routes` so that your debugging session can happen without any incidents.

## Architecture patterns

This project template follows the patterns and architecture described in the following references:

 [CLEAN Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html),
 [Hexagonal Architecture definition](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)),
 [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
 [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control)

### Docker

This is the quickest way to have your application running locally, with the only disadvantage being the lack of IDE debugging.
All you need is a working version of the `docker` engine installed on your machine and follow the steps below:

1. In a terminal window, create a docker image with:

   ```bash
   docker build --tag template .
   ```

2. Start a container, with the created image with:

   ```bash
   docker run --publish 3000:3000 template
   ```

### Unit testing

**To be done**

### Devops

**To be done**

---
