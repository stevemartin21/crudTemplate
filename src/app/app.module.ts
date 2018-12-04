
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { RequestInterceptor } from './admin/request-interceptor';
import { RouteGuard} from './route-guard';

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FeaturesComponent } from './components/features/features.component';
import { TestamonialsComponent } from './components/testamonials/testamonials.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddWorkOutComponent } from './admin/add-work-out/add-work-out.component';
import { ManageWorkoutsComponent } from './admin/manage-workouts/manage-workouts.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { HomeComponent } from './components/home/home.component';
import { Navigation2Component } from './components/navigation2/navigation2.component';
import { AdminNavigationComponent } from './admin/admin-navigation/admin-navigation.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FeaturesComponent,
    TestamonialsComponent,
    FooterComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddWorkOutComponent,
    ManageWorkoutsComponent,
    WorkoutsComponent,
    HomeComponent,
    Navigation2Component,
    AdminNavigationComponent,
    AdminFooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    RouterModule.forRoot([
       {path: '', component: HomeComponent},
       {path: 'register', component: RegisterComponent},
       {path: 'login', component: LoginComponent},
       {path: 'addWorkOut', component: AddWorkOutComponent},
       {path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard]},
       {path: 'contact', component: ContactComponent},
       {path: 'manageWorkOuts', component: ManageWorkoutsComponent},
       {path: 'workouts', component: WorkoutsComponent},
       {path: 'editWorkout/:workoutId', component: AddWorkOutComponent, canActivate: [RouteGuard]},
    ]),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    })
  ],
  providers: [RouteGuard, MDBSpinningPreloader, { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
