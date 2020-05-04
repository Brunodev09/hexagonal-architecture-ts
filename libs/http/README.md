# Network

Common library for manipulating HTTP requests.

---

### Basic Usage

1. Import and call the `Http` utility as needed:
2.  Even though we have a `RequestResponse` interface, it is highly recommendable that to use our Model-Validator library to guarantee realtime type consistency in the return object.

   ```typescript
    import { Network } from 'libs-typescript/dist';

    const http = new Network.Http('https://jsonplaceholder.typicode.com');
    
    (async () => {

        const response = await (http.post('/posts', {
            title: 'foo',
            body: 'bar',
            userId: 1
        }) as Promise<Network.HttpResponse>);
        
        console.log(response.data);
    })();
   ```

--- 

### Available Tools:

| Feature | Description |
| --- | --- |
| Http.get | Makes a GET http request with optional query string, headers and types. |
| Http.post | Makes a POST http request with optional body, query string, headers and types. |
| Http.put | Makes a PUT http request with optional body, query string, headers and types. |
| Http.patch | Makes a PATCH http request with optional body, query string,  headers and types. |
| Http.delete | Makes a DELETE http request with optional headers, query string and types. |
| Http.request | Makes a CUSTOM http request using the RequestOptions class as parameter. |