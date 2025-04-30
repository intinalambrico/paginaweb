import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'es', component: LandingComponent },
        {path:'contact' , component: ContactComponent}
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
