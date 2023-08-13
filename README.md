# SETUP GUIDE

### Clone the project

```bash
https - https://github.com/janzcio/node-todo-list.git
ssh - git@github.com:janzcio/node-todo-list.git
```

check out the project
```bash
cd node-todo-list
```

Run npm

```bash
npm install
```

Connection guide
```bash
Go to config.json and change the values of the properties with your connection. Create a `database` the same database name value in your `config.json` file for your connection 
```



Run migration
```bash
sequelize db:migrate
```

Endpoint guide
```bash
check the folder `postman` and import it to json your postman application.
```

### Run the project
```bash
npm start
```

### Run the test
```bash
npx mocha
```

