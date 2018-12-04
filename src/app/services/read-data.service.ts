import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Workout } from '../models/workout.model';


@Injectable({
  providedIn: 'root'
})
export class ReadDataService {

  private workouts: Workout[] = [];
  private workoutsUpdated = new Subject<Workout[]>();

  constructor( private http: HttpClient, private router: Router) { }

  getWorkouts() {

    this.http.get<{workouts: any}>('http://localhost:3000/read/workouts')
      .pipe(map(workoutsData => {

        console.log(workoutsData);

        return workoutsData.workouts.map(workout => {
          return {
          _id: workout._id,
          title: workout.title,
          description: workout.description,
          workOutArea: workout.workOutArea,
          accessory: workout.accessory,
          duration: workout.duration,
          };
        });
      })).subscribe(transformedWorkouts => {
        this.workouts = transformedWorkouts;
        this.workoutsUpdated.next([...this.workouts]);
      });
  }

  getWorkoutUpdateListener() {
    return this.workoutsUpdated.asObservable();
  }

  getWorkout(id: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ _id: string; title: string; description: string; duration: string, workOutArea: string, accessory: string }>(
      'http://localhost:3000/read/workout/' + id
    );
  }
}

/*

 getActions() {
    this.http
      .get<{actions: any }>('http://localhost:3000/read/actions')
      .pipe(
        map(actionData => {
          console.log(actionData);
          return actionData.actions.map(action => {
            return {
              _id: action._id,
              title: action.title,
              description: action.description,
              duration: action.duration,
              actionType: action.actionType,
              complete: action.complete
            };
          });
        })
      )
      .subscribe(transformedActions => {
        this.actions = transformedActions;
        this.actionsUpdated.next([...this.actions]);
      });
  }

  getActionUpdateListener() {
    return this.actionsUpdated.asObservable();
  }




*/
