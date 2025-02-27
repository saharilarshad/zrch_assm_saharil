# Project Title

This project is a Nest.js application with apis to handle CRUD operations for products with separate access levels for users and admins include header token.

## Features

1. **Swagger APIs Accessable**: Those APIs accessable via swagger to do a testing and included some info to add Authorize header and body.

2. **Implementing Guard**: To add the security of the request coming from the right client app.

3. **Using Drizzle ORM**: Connection Database using ORM to make it easy to manage rather then use native query.

4. **Using Neon with Postgres Database**: Using Serverless database for this assessment with free account.

5. **Prepare seed data function**: Write a function that we can seed data into database with run the cli that added in package.json.

6. **Establish the DTO**: Make the data coming and update standardize the format.

7. **Change Port Running to 3001**: Make the changes of the port app because the client in nextjs already run on port 3000.

```bash

$ npm install

$ npm run start:dev

$ npx drizzle-kit generate

$ npx drizzle-kit migrate (if any change on database schema)

$ npm run db:seed (to seed data)

$ npm run test (to run test script)

```

### 2. To run in docker.
```bash

$ docker-compose -f docker/docker-compose.yaml up -d --build

# swagger api
http://localhost:3001/api#/
```