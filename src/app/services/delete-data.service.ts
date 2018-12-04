import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteDataService {

  private workouts: Workout[] = [];
  private workoutsUpdated = new Subject<Workout[]>();

  constructor( private http: HttpClient, private router: Router) { }

  deleteWorkout(workoutId: string) {
    console.log(workoutId);
    this.http.delete('http://localhost:3000/delete/workout/' + workoutId)
      .subscribe(() => {
        const updatedWorkouts = this.workouts.filter(workout => workout._id !== workoutId);
        // console.log(action);
        this.workouts = updatedWorkouts;
        this.workoutsUpdated.next([...this.workouts]);
      });
  }
}
