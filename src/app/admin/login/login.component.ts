import { Component, OnInit } from '@angular/core';

// sdfasdf

import { CreateDataService} from '../../services/create-data.service';

import { FormGroup, Validators, FormControl } from '@angular/forms'; //s
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  private mode = 'create'

  constructor(private createDataService: CreateDataService ) { }

  ngOnInit() {

    this.form = new FormGroup({


      email: new FormControl(null, {
        validators: [ Validators.required] // Validators.required,
      }),
      password: new FormControl(null, {
        validators: [Validators.required ] // Validators.required,
      }),
    });
  }

  createToken() {

    // console.log(form.value.name); bb
    if (this.form.invalid) {
      return;
    }

    console.log('Create User ');
    console.log(this.form.value);

    this.isLoading = true;

    if (this.mode === 'create' ) {
      this.createDataService.createToken(
        this.form.value.email, this.form.value.password);
    }

    this.form.reset();
    // this.isLoading = true;
  }


}
