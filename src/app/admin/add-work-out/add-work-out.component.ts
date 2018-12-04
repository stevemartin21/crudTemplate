import { Component, OnInit } from '@angular/core';

import { CreateDataService} from '../../services/create-data.service';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

// imported services ass

import { ReadDataService } from '../../services/read-data.service';
import { UpdateDataService } from '../../services/update-data.service';

import { Workout } from '../../models/workout.model';



@Component({
  selector: 'app-add-work-out',
  templateUrl: './add-work-out.component.html',
  styleUrls: ['./add-work-out.component.scss']
})
export class AddWorkOutComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  private mode = 'create';

  private workoutId: string;
  workout: Workout;
  private authStatusSub: Subscription;

  optionsSelect: Array<any>;
  optionsSelect2: Array<any>;
  optionsSelect3: Array<any>;

  constructor( private createDataService: CreateDataService, private readDataService: ReadDataService,
    private updateDataService: UpdateDataService, public route: ActivatedRoute ) { }

  ngOnInit() {

    this.optionsSelect = [
      { value: 'Shoulders', label: 'Shoulders' },
      { value: 'Chest', label: 'Chest' },
      { value: 'Legs', label: 'Legs' },
    ];

  this.optionsSelect2 = [
    { value: '5 Minutes', label: '5 Minutes' },
    { value: '10 Minutes', label: '10 Minutes' },
    { value: '20 Minutes', label: '20 Minutes' },
  ];

  this.optionsSelect3 = [
    { value: 'Bench', label: 'Bench' },
    { value: 'Pull Up Bar', label: 'Pull Up Bar' },
    { value: 'Leg Press', label: 'Leg Press' },
  ];

  this.form = new FormGroup({


    title: new FormControl(null, {
      validators: [ Validators.required] // Validators.required,
    }),
    description: new FormControl(null, {
      validators: [Validators.required ] // Validators.required,
    }),
    workOutArea: new FormControl(null, {
      validators: [Validators.required ] // Validators.required,
    }),
    accessory: new FormControl(null, {
      validators: [Validators.required ] // Validators.required,
    }),
    duration: new FormControl(null, {
      validators: [Validators.required ] // Validators.required,
    }),

  });

  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    console.log('workoutId');
    if (paramMap.has('workoutId')) {
      this.mode = 'edit';
      this.workoutId = paramMap.get('workoutId');
      this.isLoading = true;
      this.readDataService.getWorkout(this.workoutId).subscribe(workoutData => {
        console.log(workoutData);
        this.isLoading = false;
        this.workout = {
          _id: workoutData._id,
          title: workoutData.title,
          description: workoutData.description,
          duration: workoutData.duration,
          workOutArea: workoutData.workOutArea,
          accessory: workoutData.accessory,

        };
        // if it does have a postid then set the value
        this.form.setValue({
          title: workoutData.title,
          description: workoutData.description,
          duration: workoutData.duration,
          workOutArea: workoutData.workOutArea,
          accessory: workoutData.accessory
        });
      });
    } else {
      this.mode = 'create';
      this.workoutId = null;
    }
  });





  }

  createWorkOut() {

    // console.log(form.value.name); bb
    if (this.form.invalid) {
      return;
    }

    console.log('Create User ');
    console.log(this.form.value);

    this.isLoading = true;

    if (this.mode === 'create' ) {
      this.createDataService.createWorkOut( null,
        this.form.value.title, this.form.value.description,
        this.form.value.workOutArea, this.form.value.accessory, this.form.value.duration);
    }else {
      this.updateDataService.updateWorkout(
        this.workoutId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.duration,
        this.form.value.workOutArea,
        this.form.value.accessory,

      );
    }

    this.form.reset();
    // this.isLoading = true;
  }

}
