import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TodoModule} from './todo/todo.module';
import {SequelizeModule} from '@nestjs/sequelize';

@Module({
    imports: [
        TodoModule,
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost', // Replace with your database host
            port: 5432, // Replace with your database port
            username: 'myuser', // Replace with your database username
            password: 'mypassword', // Replace with your database password
            database: 'todo_app', // Replace with your database name
            autoLoadModels: true,
            synchronize: true, // Set to false in production
        }),
        TodoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
