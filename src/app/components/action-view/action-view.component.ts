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
import {HttpClient, HttpClientModule } from '@angular/common/http';


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
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './action-view.component.html',
  styleUrl: './action-view.component.scss',
  encapsulation: ViewEncapsulation.None // Disable encapsulation
})
export class ActionViewComponent implements OnInit{

  @Input() selectedTabData: any;
  selectedOptions: string[] = [];
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

  frequentMaterialList = [
    {
      "label": "CEMENT",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "FRUIT_AND_BERRIES",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "WATCH",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "TREE_SAPLINGS",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "SHOVEL",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "MEASURING_TAPE",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "LIGHTING_SYSTEM",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "TV",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "STORAGE_CAMERA",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "STORAGE_LOCK",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "label": "STORAGE_BARS",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    }
  ];

  accordion = viewChild.required(MatAccordion);

  ngOnInit() {
  }

  constructor(private http: HttpClient) {
  }

  removeSelectedOption(option: string) {
    this.selectedOptions = this.selectedOptions.filter(selected => selected !== option);
  }

  performAction(action:any,index:number){
    this.selectedOptions = [];
    if(this.selectedIndex === index){
      this.selectedIndex = -1;
    } else{
      this.selectedIndex = index;
    }
    const request = {
      port: this.selectedTabData.port,
      action: action.function_call,
      commercialCount: this.selectedTabData.commercialCount,
      factoriesCount: this.selectedTabData.factoriesCount,
      selectedMaterials: this.selectedItemNameList.map(material => material.label)
    }
    this.http.post<any>('http://127.0.0.1:5000/perform/action', request).subscribe(response=>{
      console.log(response)
    });
  }

  onCheckboxChange(material: any) {
    const index  = this.selectedItemNameList.findIndex((item:any) => item.label === material.label);
    if (index === -1){
      this.selectedItemNameList.push(material);
      material.isAdded = true;
    }else {
      this.selectedItemNameList.splice(index, 1);
      material.isAdded = false;
    }
  }

  buildingItemList(building:any){
    return building.value as any[]; // Type assertion to ensure data is iterable
  }

  removeChip(index:number){
    this.selectedItemNameList[index].isChecked = false;
    this.selectedItemNameList.splice(index, 1);
  }

  clearAllChips(){
    this.selectedItemNameList.forEach(item=>{
      item.isChecked = false;
    });
    this.selectedItemNameList = [];
  }

  addChipToSelection(material: any){
    this.onCheckboxChange(material);
  }

}

