import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { GeneralService } from 'src/app/services/general.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  addButton: boolean = true;
  updateButton: boolean = false;
  
  taskForm!: FormGroup;
  taskObject: Task = new Task()
  taskarray: Task[] = [];
  doneTasks: Task[] = [];

  
  constructor(private generalService: GeneralService, 
    private taskService: TaskService, 
    private formBuilder: FormBuilder) {
    this.generalService.modalVisibility.subscribe(
      data => {
        this.showModal = data;
        this.addButton = true
        this.updateButton = false
      }
    )
  }
  
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.taskService.getTasks().subscribe(
      (task) => {this.taskarray = task}
    )

    this.taskService.getFinishedTasks().subscribe(
      (task) => {this.doneTasks = task}
    )

    this.getTasks();

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
    this.selectedTask = this.selectedTask === task ? null : task;
  }

  getTasks() {
    this.taskService.taskChanged.subscribe(
      (task: Task[]) => {this.taskarray = task}
    )
  }

  getCompleted() {
    this.taskService.getFinishedTasks().subscribe(
      (task: Task[]) => {this.doneTasks = task}
    )
  }

  addTask() {
    const newTask: Task = {
      id: this.generateId(),
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

  editTask(task: Task) {
    this.taskForm.controls["id"].setValue(task.id);
    this.taskForm.controls["name"].setValue(task.task);
    this.taskForm.controls["description"].setValue(task.desc)

    this.showModal = true;
    this.addButton = false;
    this.updateButton = true;

  }

  updateTask() {
    const updatedTask: Task = {
      id: this.taskForm.value.id,
      task: this.taskForm.value.name,
      desc: this.taskForm.value.description
    };

    this.taskService.updateTask(updatedTask).subscribe(
      (task: Task) => {
        console.log(task);
        this.getTasks()
      }
    )

    this.closeModal()
  }

  deleteTask(taskId: string, task: Task) {
    this.taskService.deleteTask(taskId, task).subscribe(
      data => {
        console.log(data);
        this.getCompleted();
      }
    )
  }

  moveToComepleted(task: Task) {
    this.taskService.finishTask(task.id,task).subscribe(
      data => {
        console.log(data);
        this.getTasks();
        this.getCompleted();
      }
    )
  }

  deleteCompleted(taskId: string, task: Task) {
    this.taskService.deleteFinished(taskId, task).subscribe(
      data => {
        console.log(data);
        this.getCompleted();
      }
    );
  }

  private generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

}
