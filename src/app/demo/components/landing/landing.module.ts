import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { AnimateEnterDirective } from './animateenter.directive'; 
import { CardModule } from 'primeng/card'; 
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import {SpeedDialModule} from 'primeng/speeddial';
@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        ButtonModule,
        RouterModule,
        StyleClassModule,
        AppConfigModule,
        CardModule,
        FormsModule,
        InputTextareaModule,
        ToastModule,SpeedDialModule
    ],
    declarations: [LandingComponent, ContactComponent, AnimateEnterDirective]
})
export class LandingModule { }
