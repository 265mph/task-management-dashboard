import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { findIndex, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskChanged = new Subject<Task[]>();
  finishedTasksChanged = new Subject<Task[]>();
  deletedChanged = new Subject<Task[]>();

  private tasks: Task[] = [
    {
      id: "task3",
      task: "Present project",
      desc: "display project and explain code"
    }
  ]

  private finishedTasks: Task[] = [
    {
      id: "task1",
      task: "Create system UI",
      desc: "get design samples from dribbble.com for inspiration"
    },
    {
      id: "task2",
      task: "Write system code",
      desc: "program the system using angular framework"
    }
  ]

  private deletedTasks: Task[] = [

  ]

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(this.tasks.slice())
  }

  getFinishedTasks(): Observable<Task[]> {
    return of(this.finishedTasks.slice())
  }

  getDeleted(): Observable<Task[]> {
    return of(this.deletedTasks.slice())
  }

  addTask(task: Task): Observable<Task> {
    this.tasks.push(task)
    this.taskChanged.next(this.tasks.slice())
    return of(task)
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    this.tasks[index] = updatedTask;
    this.taskChanged.next(this.tasks.slice())
    return of(updatedTask)
  }

  deleteTask(taskId: string, task: Task): Observable<boolean> {
    const index = this.tasks.findIndex(task => task.id === taskId);
    this.tasks.splice(index, 1);
    this.deletedTasks.push(task);
    this.taskChanged.next(this.tasks.slice());

    return of(true)
  }

  finishTask(task: Task): Observable<Task> {
    this.finishedTasks.push(task);
    this.deleteTask(task.id, task).subscribe;
    this.finishedTasksChanged.next(this.finishedTasks.slice());

    return of(task)
  }

  deleteFinished(taskId: string, task: Task): Observable<boolean> {
    const index = this.tasks.findIndex(task => task.id === taskId);
    this.finishedTasks.splice(index, 1);
    this.deletedTasks.push(task);
    this.finishedTasksChanged.next(this.tasks.slice());

    return of(true)
  }
  
}
