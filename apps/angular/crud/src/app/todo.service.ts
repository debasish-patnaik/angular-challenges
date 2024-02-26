import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './todo.model';
@Injectable({ providedIn: 'root' })
export class TodoService {
  #todos = signal<Todo[]>([]);

  todos = computed(this.#todos);

  constructor(private http: HttpClient) {}

  public getAllTodos(): void {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.#todos.set(todos);
      });
  }

  public updateTodo(todo: Todo): void {
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          userId: todo.userId,
          id: todo.id,
          title: randText(),
          completed: todo.completed,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((updatedTodo) => {
        this.#todos.update((todos) =>
          todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        );
      });
  }
}
