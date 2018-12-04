import { Component, OnInit } from '@angular/core';

import { CreateDataService} from '../../services/create-data.service';

import { FormGroup, Validators, FormControl } from '@angular/forms'; //s
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  private mode = 'create';

  constructor( private createDataService: CreateDataService) { }

  ngOnInit() {

    this.form = new FormGroup({

      name: new FormControl(null, {
        validators: [ Validators.minLength(3), Validators.required] // Validators.required,
      }),
      email: new FormControl(null, {
        validators: [ Validators.required] // Validators.required,
      }),
      password: new FormControl(null, {
        validators: [Validators.required ] // Validators.required,
      }),
    });
  }

  createUser() {

    // console.log(form.value.name); bb
    if (this.form.invalid) {
      return;
    }

    console.log('Create User ');
    console.log(this.form.value);

    this.isLoading = true;

    if (this.mode === 'create' ) {
      this.createDataService.createUser( this.form.value.name,
        this.form.value.email, this.form.value.password);
    }

    this.form.reset();
    // this.isLoading = true;
  }

}
