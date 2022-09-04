# socket-api-app

## SetUp

### .env

アプリケーションホーム配下に配置

| 変数                     | 設定値                       |
| :----------------------- | :--------------------------- |
| DATABASE_URL             | npx prisma init で自動生成   |
| LISTEN_PORT              | PORT                         |
| CORS_ORIGINS             | スペース区切りで複数設定可能 |
| DATABASE_HOST            | データベースホスト名         |
| DATABASE_USER            | アプリケーションユーザ       |
| DATABASE_PASSWORD        | パスワード                   |
| DATABASE_TARGET_DATABASE | データベース名               |

### MySQL

```
create database socket;
```

```
drop table users;

create table users(
  id int unsigned not null auto_increment,
  nickname varchar(100) not null,
  email varchar(100) not null,
  password varchar(100) not null,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  primary key (id),
  unique key(email)
);

insert into users(nickname,email,password) values
('太郎','taro@example.com','$2b$10$wFi8RBzI3EpHt6XxqxLdLO41437B8RniV6ytM6NAACNPdFbjPj3je'),
('花子','hanako@example.com','$2b$10$OaDQnNzHPyS4RKihI3loxuCQPogfuBz5/WYDEtvBpV0B2FTR4l0MW');
```

### Prisma

`./prisma/schema.prisma`に定義がされていない場合、テーブル作成後実行

```
npx prisma db pull
npx prisma generate
```

## Install Memo

```
npm install -y express cors pug mysql2 socket.io @prisma/client dotenv bcrypt express-session cookie-parser
npm install -D typescript @types/node ts-node @types/express types/mysql2# @types/cors @types/pug nodemon @types/bcrypt @types/express-session @types/cookie-parser
npx tsc --init
mkdir src
mkdir src/api
mkdir src/api/v1
npx -y prisma
npx prisma init
```

### swagger-ui-express,swagger-jsdoc

```
npm install --save-dev swagger-ui-express swagger-jsdoc @types/swagger-ui-express @types/swagger-jsdoc
```

### http-graceful-shutdown

```
npm install http-graceful-shutdown
```

### zod

```
npm install zod
```

### log4js

```
npm install log4js
npm install --save-dev @types/log4js
```
