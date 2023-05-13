import { Sequelize } from 'sequelize-typescript';
import { Todo } from '../todo/todo.model';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.DB_HOST, // Replace with your database host
                port: Number(process.env.DB_PORT), // Replace with your database port
                username: process.env.POSTGRES_USER, // Replace with your database username
                password: process.env.POSTGRES_PASSWORD, // Replace with your database password
                database: process.env.POSTGRES_DB, // Replace with your database name
            });
            sequelize.addModels([Todo]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
