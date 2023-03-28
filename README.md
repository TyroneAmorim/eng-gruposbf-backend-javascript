
## Desafio técnico - Backend/Javascript - Typescript - Nestjs

Olá,

Desde já, agradeço a oportunidade de participar deste processo.
Aqui apresento o resultado do desafio pedido e as instruções para executa-lo.


## Funcionamento

Ao fazer uma requisição para a API, o serviço irá consultar as moedas que estão disponíveis para conversão no banco de dados. Em seguida, irá fazer uma requisição a uma API externa para busca das cotações atuais. Tendo sucesso, os dados serão cacheados no Redis, pelo périodo definido na variável de ambiente ***REDIS_TTL***, para um melhor cuidado com o rate limit da API contratada.
## Recursos utilizados

* Nestjs
* Typescript
* Typeorm
* MongoDB
* Redis
* Docker
* Swagger


## Testes (Jest)

```
npm run test:cov
```
## Como executar

#### Gere os containers
```bash
docker-compose --env-file .env.development up -d
```

#### Rode as migrations
**OBS**: Este comando já está presente no arquivo docker-compose.
```bash
npm run migration:run:dev
```


#### Abra no seu navegador e teste

http://localhost:3000/swagger