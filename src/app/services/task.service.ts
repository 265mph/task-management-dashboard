import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskChanged = new Subject<Task[]>()
  private tasks: Task[] = [  ]

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(this.tasks.slice())
  }

  addTask(task: Task): Observable<Task> {
    this.tasks.push(task)
    this.taskChanged.next(this.tasks.slice())
    return of(task)
  }
}
