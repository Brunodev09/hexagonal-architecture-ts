/**
 * Classe base para inicialização do servidor com Express.
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
            const message = `Aplicação ${applicationName} no enviroment de ${environment}, escutando em http://localhost:${port} na versão ${version}`;
            if (loggerInstance && loggerInstance.info) loggerInstance.info(message);
            else console.log(message);
        });
    }
}