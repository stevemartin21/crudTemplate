import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// imported models

import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  private workouts: Workout[] = [];
  private workoutsUpdated = new Subject<Workout[]>();

  constructor( private http: HttpClient, private router: Router) { }

  // Update Action

  updateWorkout(_id: string, title: string, description: string, duration: string, workOutArea: string, accessory: string) {
    // tslint:disable-next-line:max-line-length
    const workout: Workout = { _id: _id, title: title, description: description, duration: duration, workOutArea: workOutArea, accessory: accessory};
    console.log(workout);
    this.http
      .put('http://localhost:3000/update/workout/' + _id, workout)
      .subscribe(response => {
        const updatedActions = [...this.workouts];
        const oldPostIndex = updatedActions.findIndex(p => p._id === workout._id);
        updatedActions[oldPostIndex] = workout;
        this.workouts = updatedActions;
        this.workoutsUpdated.next([...this.workouts]);
        this.router.navigate(['/dashboard']);
      });
  }
}
