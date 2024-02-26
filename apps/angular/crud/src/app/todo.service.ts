import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getAllTodos = () =>
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

  updateTodo = (todo: Todo) =>
    this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        id: todo.id,
        userId: todo.userId,
        title: randText(),
        completed: todo.completed,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );

  deleteTodo = (id: number) =>
    this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
}
