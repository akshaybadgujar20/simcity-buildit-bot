import {Component, Input, OnInit, ViewEncapsulation, viewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from "@angular/material/select";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatChip, MatChipsModule} from "@angular/material/chips";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatDatepicker} from "@angular/material/datepicker";
import {MatCheckbox} from "@angular/material/checkbox";
import { MatButtonModule } from '@angular/material/button';


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
    MatRadioButton,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatDatepicker,
    MatCheckbox,
    MatExpansionModule,
    MatButtonModule
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
  selectedItemNameList:any[] = [];

  leftList = [
    "BUILDING_SUPPLIES_STORE",
    "FURNITURE_STORE",
    "FASHION_STORE",
    "FAST_FOOD_RESTAURANT",
    "DESERT_SHOP",
    "VU_ITEMS",
    "EXPANSION_ITEMS",
    "BUREAU_OF_RESTORATION",
    "CAR_PARTS",
    "COUNTRY_STORE",
    "DONUT_SHOP",
    "ECO_SHOP",
  ];

  rightList = [
    "FACTORY_RAW_MATERIALS",
    "FARMER'S_MARKET",
    "GARDENING_SUPPLIES",
    "HARDWARE_STORE",
    "HOME_APPLIANCES",
    "CITY_STORAGE_ITEMS",
    "REGIONAL_RAW_MATERIALS",
    "SILK_STORE",
    "SPORT_SHOP",
    "TOY_SHOP",
    "TROPICAL_PRODUCTS_STORE",
    "FISH_MARKETPLACE",
  ];

  accordion = viewChild.required(MatAccordion);

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

  onCheckboxChange(material: any) {
    const index  = this.selectedItemNameList.findIndex((item:any) => item.label === material.label);
    if (index === -1){
      this.selectedItemNameList.push(material);
    }else {
      this.selectedItemNameList.splice(index, 1);
    }
    console.log(this.selectedItemNameList);
  }

  buildingItemList(building:any){
    return building.value as any[]; // Type assertion to ensure data is iterable
  }

  removeChip(index:number){
    this.selectedItemNameList[index].isChecked = false;
    this.selectedItemNameList.splice(index, 1);
  }

}

