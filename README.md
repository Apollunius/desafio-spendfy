<h1 align="center">Desafio Técnico Spendfy</h1>

> Realizar um API REST que salva, visualiza e deleta documentos no banco de dados. E uma rota para calcular o dia da semana passando um 'amountOfDays' e o 'startDay'

## Primeiros passos

1. Você precisará de Node.js 12 instalado e do PostgreSQL 12.
2. Instale dependências com `npm i`.
3. Copie o arquivo `.env.example` para o arquivo `.env`.
4. Se você tiver um PostgreSQL local instalado, crie um database vazio nele e configure o `.env` com os acessos.
5. Execute o projeto localmente com `npm run dev`.
6. Execute a suite de testes do projeto com `npm run test`.

## Migrations

1. Migrações podem ser executadas no ambiente local com `npm run migration:run`.
2. Caso queira reverter a última migração executada em no ambiente local, rode `npm run migration:revert`.
3. Caso queira criar uma migração, rode `npm run migration:create nome-da-migracao`.

## Funcionalidades

### Documentos

Há 4 rotas, sendo elas:

1. `POST /documents` -> Cria um documento;
   > No body será necessário passar o nome do documento(único) e o conteúdo do documento.
 

2. `GET /documents` -> Visualiza todos os documentos criados;	
   > Irá retornar o id, name, content(_na base64_) e o kbSize, por ordem decrescente de criação.
 

3. `GET /documents/:documentId` -> Visualiza um único documento pesquisado pelo id;	
   > Necessário passar o **id válido** do documento no params da rota. Irá retornaro id, name, content(_na base64_) e o kbSize.
  

4. `DELETE /documents/:documentId` -> Deleta(_lógicamente_) um documento;
   > Necessário passar o **id válido** do documento no params da rota. Irá ser setado o deletedAt com a data que o arquivo foi deletado, impedindo que seja acessado novamente nas rotas GET.


### Weekday-After

 Há somente 1 roda, sendo ela:

1. `GET /weekday-after?startDay={startDay}&amountOfDays={amountOfDays}` -> Calcula o dia final passando um dia inicial e a quantidade de dias que dias que desejar;
   > Necessário passar na querystring o **startDay** sendo um dia da semana válido e o **amountOfDays** sendo a quantidade de dias que deseja contar a partir do startDay.