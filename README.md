# typescript-nodejs-template
Template for enterprise Typescript + Nodejs enterprise applications with SOLID, Hexagonal and ioc principles.

**Stack de tecnologias:**

| Tecnologia | Papel | 
| --- | --- |
| **Typescript** | Linguagem de programação |
| **[express](https://expressjs.com/)** | REST API framework, responsável por rotear e parsear requisições e respostas HTTP | 
| **[tsoa](https://github.com/lukeautry/tsoa)** | Registra automaticamente as rotas do **Express** e gera a documentação **Swagger** para todas as Controllers REST da aplicação
 | 
| **[InversifyJS](https://github.com/inversify/InversifyJS)** | IoC (inversion of control) framework, para gerenciar inversão de controle das dependências |
| **[Pino](https://github.com/pinojs/pino)** | Logger |
| **[Libs](./libs)** | Bibliotecas escritas por nós para ajudar a manter o framework |
---

## Rodando localmente

1. Instale as depedências do projeto, rodando o seguinte comando numa janela do terminal:

   ```bash
   npm install
   ```

2. Inicie a aplicação:

   ```bash
   npm run start
   ```

3. A UI da API se encontrará disponível no seguinte endereço:

   ```
   http://localhost:3000/api-docs/
   ```

O comando `start` é apenas um atalho que, por debaixo dos panos, executa outros dois scripts:

1. `npm run routes` - Gera automaticamente as rotas do Express e a documentação do Swagger para todas as classes de Controller.
2. `npm run dev` - Inicia o [compilador Typescript](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

Se você já rodou o comando `npm run routes` e não alterou nenhuma classe de Controllers, você pode iniciar a aplicação rodando `npm run dev`.

### Configurando a IDE (VS Code)

Instale as extensões para que sua IDE te ajude a manter os princípios dos nossos projetos.

- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

### Debugando

Já existe um arquivo com o nome de `.vscode/launch.json` no projeto que automaticamente configura a ferramenta de debug do VS Code. Para debugar a aplicação, acesse a aba _Debug_ e clique em "_Start and Debug_" no topo da janela.

Garanta que o comando de registro de rotas tenha sido rodado anteriormente (`npm run routes`) para que a sessão de debug ocorra sem eventuais problemas.

## Padrões de arquitetura

Este template de projeto segue os padrões e arquitetura descritas nas seguintes referências:

 [CLEAN Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html),
 [Hexagonal Architecture definition](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)),
 [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
 [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control)

### Docker

Esta é a forma mais rápida de ter a sua aplicação rodando localmente, com a desvantagem da possibilidade de debug através da IDE. Basta ter uma versão da engine do `docker` instalada em sua máquina e seguir estes passos:

1. Numa janela do terminal, crie uma image do docker com o seguinte comando:

   ```bash
   docker build --tag bffcore .
   ```

2. Inicie um container da imagem recém criada, desta forma:

   ```bash
   docker run --publish 3000:3000 bffcore
   ```

### Unit testing

**To be done**

### Devops

**To be done**

---
