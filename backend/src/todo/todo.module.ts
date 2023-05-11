import {Module} from '@nestjs/common';
import {TodoController} from './todo.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {TodoService} from "./todo.service";
import {Todo} from './todo.model';

@Module({
    imports: [SequelizeModule.forFeature([Todo])],
    controllers: [
        TodoController,
    ],
    providers: [TodoService],
})
export class TodoModule {
}
