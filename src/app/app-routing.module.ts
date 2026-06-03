import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { MapSpiderfierComponent } from './map-spiderfier/map-spiderfier.component'
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardNewComponent } from './dashboard-new/dashboard-new.component';
import { MenuNewComponent } from './menu-new/menu-new.component';
import { LoadComponent } from './load/load.component';
import { UserComponent } from './user/user.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { MapPolyComponent } from './map-poly/map-poly.component';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MapClustererComponent } from './map-clusterer/map-clusterer.component';
import { MapDealerNoticeComponent } from './map-dealer-notice/map-dealer-notice.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component: SignUpComponent},

  {path:'form', component:FormComponent},
  {path:'mapspiderfier', component:MapSpiderfierComponent},
  {path:'reactiveForm', component: ReactiveFormComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'dashboardNew', component: DashboardNewComponent},
  {path:'menuNew', component: MenuNewComponent},
  {path:'load', component: LoadComponent},
  {path:'user', component: UserComponent},
  {path:'addGroup', component: AddGroupComponent},
  {path:'mapPoly', component: MapPolyComponent},
  {path:'formReactive', component: FormReactiveComponent},
  {path:'signup', component:SignUpComponent},
  {path:'mapClusterer', component:MapClustererComponent},
  {path:'mapDealerNotice', component:MapDealerNoticeComponent},
  {path:'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



