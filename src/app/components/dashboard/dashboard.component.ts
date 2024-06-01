import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { GeneralService } from 'src/app/services/general.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  taskForm!: FormGroup;
  taskObject: Task = new Task()
  taskarray: Task[] = []

  
  constructor(private generalService: GeneralService, private taskService: TaskService, private formBuilder: FormBuilder) {
    this.generalService.modalVisibility.subscribe(
      data => {this.showModal = data}
    )
  }
  
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: [''],
      name: [''],
      description: ['']
    })

    this.getTasks()

    this.taskForm.reset()
  }
  
  //method to close the form modal
  showModal: boolean = false;
  closeModal() {
    this.showModal = false;
    this.taskForm.reset()
  }
  
  // method to show the options for each task
  selectedTask: Task | null = null;
  showTaskOptions(task: Task) { 
    if (this.selectedTask === task) {
      this.selectedTask = null;
    } else {
      this.selectedTask = task;
    }
  }

  getTasks() {
    this.taskService.taskChanged.subscribe(
      (task: Task[]) => {this.taskarray = task}
    )
  }

  addTask() {
    const newTask: Task = {
      task: this.taskForm.value.name,
      desc: this.taskForm.value.description
    };

    this.taskService.addTask(newTask).subscribe(
      (task: Task) => {
        console.log(task);
        this.getTasks();
      }
    )

    this.closeModal()
  }

}
