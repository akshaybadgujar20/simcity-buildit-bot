import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppComponent } from './app.component';
import {SharedDataService} from "./services/shared-data.service";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatDatepicker} from "@angular/material/datepicker";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {ActionViewComponent} from "./components/action-view/action-view.component";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {routes} from "./app.routes";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    ActionViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Add routing module here
    HttpClientModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatRadioGroup,
    MatRadioButton,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatDatepicker,
    MatCheckbox,
    MatExpansionModule,
    MatButtonModule,
    HttpClientModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatSidenavContainer,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [SharedDataService], // Provide your service here if not provided in root
  bootstrap: [AppComponent],
})
export class AppModule {}
