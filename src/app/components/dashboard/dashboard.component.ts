import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  taskForm!: FormGroup;

  
  constructor(private generalService: GeneralService, private formBuilder: FormBuilder) {
    this.generalService.modalVisibility.subscribe(
      data => {this.showModal = data}
    )
  }
  
  //method to close the form modal
  showModal: boolean = false;
  closeModal() {
    this.showModal = false;
  }
  
  // method to show the options for each task
  showOptions: boolean = false;
  showTaskOptions() { 
    this.showOptions = !this.showOptions
  }

  

}
