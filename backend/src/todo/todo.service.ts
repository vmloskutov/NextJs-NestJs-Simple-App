import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo)
        private todoModel: typeof Todo,
    ) {}

    async findAll(): Promise<Todo[]> {
        return this.todoModel.findAll();
    }

    async findById(id: number): Promise<Todo> {
        return this.todoModel.findByPk(id);
    }

    async create(todoData: Partial<Todo>): Promise<Todo> {
        return this.todoModel.create(todoData);
    }

    async update(id: number, todoData: Partial<Todo>): Promise<[number, Todo[]]> {
        return this.todoModel.update(todoData, {
            where: { id },
            returning: true,
        });
    }

    async completeTodo(id: number): Promise<Todo> {
        const todo = await this.todoModel.findByPk(id);
        if (!todo) {
            throw new Error('Todo not found');
        }

        todo.completed = true;
        await todo.save();

        return todo;
    }

    async delete(id: number): Promise<number> {
        return await this.todoModel.destroy({ where: { id } });
    }
}
