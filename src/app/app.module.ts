import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormComponent } from './form/form.component';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatTabsModule} from '@angular/material/tabs';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapSpiderfierComponent } from './map-spiderfier/map-spiderfier.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardNewComponent } from './dashboard-new/dashboard-new.component'
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuNewComponent } from './menu-new/menu-new.component';
import { LoadComponent } from './load/load.component';
import { UserComponent } from './user/user.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddGroupComponent } from './add-group/add-group.component';
import { MapPolyComponent } from './map-poly/map-poly.component';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';
import { NgChartsModule } from 'ng2-charts';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MapClustererComponent } from './map-clusterer/map-clusterer.component';
import { MapDealerNoticeComponent } from './map-dealer-notice/map-dealer-notice.component';
import { LoginComponent } from './login/login.component';



@NgModule({ declarations: [
        AppComponent,
        FormComponent,
        MapSpiderfierComponent,
        ReactiveFormComponent,
        ForgotPasswordComponent,
        DashboardNewComponent,
        MenuNewComponent,
        LoadComponent,
        UserComponent,
        AddGroupComponent,
        MapPolyComponent,
        FormReactiveComponent,
        SignUpComponent,
        MapClustererComponent,
        MapDealerNoticeComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        NgChartsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatSnackBarModule,
        MatBadgeModule,
        MatListModule,
        MatDividerModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatMenuModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule,
        GoogleMapsModule,
        MatSidenavModule,
        MatDialogModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
