import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from "@angular/material/select";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatChip, MatChipsModule} from "@angular/material/chips";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";


@Component({
  selector: 'app-action-view',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatRadioGroup,
    MatRadioButton
  ],
  templateUrl: './action-view.component.html',
  styleUrl: './action-view.component.scss',
  encapsulation: ViewEncapsulation.None // Disable encapsulation
})
export class ActionViewComponent implements OnInit{

  @Input() selectedTabData: any;
  selectedOptions: string[] = [];
  searchControl = new FormControl();
  groupedOptions: any[] =  [];
  filteredOptions: any[] =  [];
  selectedIndex: any;

  ngOnInit() {

    Object.keys(this.selectedTabData.materials).forEach(key => {
      let itemList: string[] = [];
      this.selectedTabData.materials[key].forEach((materialName:string)=>{
        itemList.push(materialName);
      });
      let object = {
        label: key,
        options:itemList
      }
      this.groupedOptions.push(object);
    });
    this.filteredOptions = this.groupedOptions;
  }

  constructor() {
    this.searchControl.valueChanges.subscribe((searchValue) => {
      this.filterOptions(searchValue);
    });
  }

  private filterOptions(searchValue: string) {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    this.filteredOptions = this.groupedOptions.map(group => ({
      ...group,
      options: group.options.filter((option: string) => option.toLowerCase().includes(lowerCaseSearchValue))
    })).filter(group => group.options.length > 0); // Filter out empty groups
  }

  removeSelectedOption(option: string) {
    this.selectedOptions = this.selectedOptions.filter(selected => selected !== option);
  }

  selectAction(action:any,index:number){
    this.selectedOptions = [];
    if(this.selectedIndex === index){
      this.selectedIndex = -1;
    } else
      this.selectedIndex = index;
  }

}

