import {Component, Input, OnInit, viewChild, ViewEncapsulation} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatDatepicker} from "@angular/material/datepicker";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButtonModule} from '@angular/material/button';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatDivider} from "@angular/material/divider";


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
    HttpClientModule,
    MatDivider
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
      "name": "CEMENT",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/cement.png"
    },
    {
      "name": "FRUIT_AND_BERRIES",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/fruit_and_berries.png"
    },
    {
      "name": "WATCH",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/watch.png"
    },
    {
      "name": "TREE_SAPLINGS",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/tree_samplings.png"
    },
    {
      "name": "SHOVEL",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/shovel.png"
    },
    {
      "name": "MEASURING_TAPE",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/measuring_tape.png"
    },
    {
      "name": "LIGHTING_SYSTEM",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/lighting_system.png"
    },
    {
      "name": "TV",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/tv.png"
    },
    {
      "name": "STORAGE_CAMERA",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/storage_camera.png"
    },
    {
      "name": "STORAGE_LOCK",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/storage_lock.png"
    },
    {
      "name": "STORAGE_BARS",
      "isChecked": false,
      "isAdded": false,
      "imgUrl":"assets/icons/storage_bars.png"
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

  addChipToSelection(materialInfo: any){
    const index  = this.selectedItemNameList.findIndex((item:any) => item.name === materialInfo.name);
    if (index === -1){
      this.selectedItemNameList.push(materialInfo);
      materialInfo.isAdded = true;
    }else {
      this.selectedItemNameList.splice(index, 1);
      materialInfo.isAdded = false;
    }
  }

  getItemValue(item:any){
    return item as any;
  }

  getImageUrl(materialInfo:any){
    return materialInfo.imgUrl;
  }
}

