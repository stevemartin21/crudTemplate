import { Component, OnInit, ViewChildren, QueryList, ElementRef, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
// Imported Services
import { ReadDataService } from '../../services/read-data.service';
import { DeleteDataService } from '../../services/delete-data.service';
// Imported Models adsd
import { Workout } from '../../models/workout.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  workouts: Workout[] = [];
  workoutSubs: Subscription;

  @ViewChildren('pages') pages: QueryList<any>;
  itemsPerPage = 1;
  numberOfVisiblePaginators = 10;
  numberOfPaginators: number;
  paginators: Array<any> = [];
  activePage = 1;
  firstVisibleIndex = 0;
  lastVisibleIndex: number = this.itemsPerPage - 1  ;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;
  url = 'https://jsonplaceholder.typicode.com/posts';
  tableData: string[];

  constructor(private readDataService: ReadDataService, private deleteDataService: DeleteDataService
    , private router: Router, private http: Http,
    private el: ElementRef  ) { }

  ngOnInit() {

    this.readDataService.getWorkouts();
    this.workoutSubs = this.readDataService.getWorkoutUpdateListener()
      .subscribe((workouts: Workout[]) => {
        this.workouts = workouts;
        console.log(this.workouts);
        this.addPaginators();
      });

  }

  getData(): Observable<any> {
    return this.http.get(this.url);
  }

  changePage(event: any) {
    if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
      this.activePage = +event.target.text;
      this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage ;
      this.lastVisibleIndex = this.activePage * this.itemsPerPage - 1;
    }
  }

  nextPage(event: any) {
    if (this.pages.last.nativeElement.classList.contains('active')) {
      if ((this.numberOfPaginators - this.numberOfVisiblePaginators) >= this.lastVisiblePaginator) {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
      this.lastVisiblePaginator += this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
      this.lastVisiblePaginator = this.numberOfPaginators;
      }
    }

    this.activePage += 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage ;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage - 1;
  }

  previousPage(event: any) {
    if (this.pages.first.nativeElement.classList.contains('active')) {
      if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === this.numberOfVisiblePaginators)  {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -= (this.numberOfPaginators % this.numberOfVisiblePaginators);
      }
    }

    this.activePage -= 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage ;
    this.lastVisibleIndex = (this.activePage * this.itemsPerPage - 1 );
      console.log(this.lastVisibleIndex);
  }

  firstPage() {
    this.activePage = 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage ;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage - 1;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;
  }

  lastPage() {
    this.activePage = this.numberOfPaginators;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage ;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage - 1;

    if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
      this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
      this.lastVisiblePaginator = this.numberOfPaginators;
    } else {
      this.lastVisiblePaginator = this.numberOfPaginators;
      this.firstVisiblePaginator = this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
    }
  }

  addPaginators() {
    if (this.workouts.length % this.itemsPerPage === 0) {
      this.numberOfPaginators = Math.floor(this.workouts.length / this.itemsPerPage);
    } else {
      this.numberOfPaginators = Math.floor(this.workouts.length / this.itemsPerPage );
    }

    for (let i = 1; i <= this.numberOfPaginators; i++) {
      this.paginators.push(i);
    }
  }


}
