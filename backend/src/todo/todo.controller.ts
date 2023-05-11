import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Todo> {
        return this.todoService.findById(id);
    }

    @Post()
    async create(@Body() todoData: Partial<Todo>): Promise<Todo> {
        return this.todoService.create(todoData);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() todoData: Partial<Todo>,
    ): Promise<Todo> {
        const [, [updatedTodo]] = await this.todoService.update(id, todoData);
        return updatedTodo;
    }

    @Put(':id/complete')
    async completeTodo(@Param('id') id: number): Promise<Todo> {
        return this.todoService.completeTodo(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<number> {
        return this.todoService.delete(id);
    }
}
