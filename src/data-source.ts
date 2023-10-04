import "reflect-metadata";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "blog",
    dropSchema: false,
	synchronize: true,
	migrationsRun: false,
    logging: true,
    migrations: ["dist/**/migrations/*{.ts,.js}"],
    entities: [__dirname + '/../**/*.entity.{js,ts}']
});
