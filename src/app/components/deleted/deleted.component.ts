import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css']
})
export class DeletedComponent implements OnInit{
  deletedTasks: Task[] = [];


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getDeleted().subscribe(
      task => {this.deletedTasks = task}
    )
  }

  getDeleted() {
    this.taskService.getDeleted().subscribe(
      task => {this.deletedTasks = task}
    )
  }

  selectedTask: Task | null = null;
  showTaskOptions(task: Task) { 
    if (this.selectedTask === task) {
      this.selectedTask = null;
    } else {
      this.selectedTask = task;
    }
  }

  deleteTask(task: Task, taskId: string) {
    this.taskService.deleteDeleted(task, taskId).subscribe(
      data => {
        console.log(data);
        this.getDeleted()
      }
    )
  }

  recoverTask(task: Task, taskId: string) {
    this.taskService.recoverTask(taskId, task).subscribe(
      data => {
        console.log(data);
        this.getDeleted()
      }
    )
  }
}
