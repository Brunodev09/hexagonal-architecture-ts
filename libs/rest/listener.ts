/**
 * Base class for creating a server with express.
 */

export class serverListener {
    app: any;
    constructor(app: any) {
        this.app = app;
    }

    middlewares(arrayOfMiddlewares: ((func: any) => void)[]): void {
        for (const middleware of arrayOfMiddlewares) {
            middleware(this.app);
        }
    }

    run(port: number, applicationName: string, environment: string, version: string, loggerInstance?: any) {
        this.app.listen(port, (): void => {
            const message = `Application ${applicationName} on env ${environment}, listening on http://localhost:${port} on version ${version}`;
            if (loggerInstance && loggerInstance.info) loggerInstance.info(message);
            else console.log(message);
        });
    }
}