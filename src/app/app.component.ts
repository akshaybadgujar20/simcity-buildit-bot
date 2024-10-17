import { Component, computed, inject, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {ActionViewComponent} from "./components/action-view/action-view.component";
import { CommonModule } from '@angular/common';
import {ADD_COMMERCIAL_MATERIAL_TO_PRODUCTION,
  ADD_RAW_MATERIAL_TO_PRODUCTION, ADVERTISE_ITEM_ON_TRADE_DEPOT, COLLECT_FROM_COMMERCIAL, COLLECT_FROM_FACTORY,
  COLLECT_SOLD_ITEM_MONEY, CONTINUOUS_BUY, SELL_WITH_FULL_VALUE, SELL_WITH_ZERO_VALUE} from "./constants/city.actions";
import {BARLEYCORN_POINT, BASE_CITY,
  COTTONWOOD_FOREST, GRAND_HAVEN, HOKUSAI_CLIFFS, JUGBAND_HILLS, MAGNOLIA_WETLANDS, NAUTILUS_PLATEAU,
  PETROL_BAY, SUNSHINE_VALLEY, TRADERS_RIDGE } from './constants/city.names';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatIcon} from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from "./components/bottom-sheet/bottom-sheet.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    ActionViewComponent,
    HttpClientModule,
    MatIcon,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simcity-buildit-bot';
  selectedTab: any = 0;
  materialList: any;
  tabList: any;
  showFiller = false;
  actionsValues = [
    {"title": CONTINUOUS_BUY, "function_call": "CONTINUOUS_BUY"},
    {"title": SELL_WITH_FULL_VALUE, "function_call": "SELL_WITH_FULL_VALUE"},
    {"title": SELL_WITH_ZERO_VALUE, "function_call": "SELL_WITH_ZERO_VALUE"},
    {"title": COLLECT_FROM_FACTORY, "function_call": "COLLECT_FROM_FACTORY"},
    {"title": COLLECT_FROM_COMMERCIAL, "function_call": "COLLECT_FROM_COMMERCIAL"},
    {"title": COLLECT_SOLD_ITEM_MONEY, "function_call": "COLLECT_SOLD_ITEM_MONEY"},
    {"title": ADVERTISE_ITEM_ON_TRADE_DEPOT, "function_call": "ADVERTISE_ITEM_ON_TRADE_DEPOT"},
    {"title": ADD_COMMERCIAL_MATERIAL_TO_PRODUCTION, "function_call": "ADD_COMMERCIAL_MATERIAL_TO_PRODUCTION"},
    {"title": ADD_RAW_MATERIAL_TO_PRODUCTION, "function_call": "ADD_RAW_MATERIAL_TO_PRODUCTION"},
  ];
  selectedRoute = 0;
  routerLinkList = [
    {
      link: "/base_city",
      name: "Base City"
    },
    {
      link: "/barleycorn_point",
      name: "Barleycorn Point"
    },
    {
      link: "/sunshine_valley",
      name: "Sunshine Valley"
    },
    {
      link: "/traders_ridge",
      name: "Traders Ridge"
    },
    {
      link: "/magnolia_wetlands",
      name: "Magnolia Wetlands"
    },
    {
      link: "/hokusai_cliffs",
      name: "Hokusai Cliffs"
    },
    {
      link: "/nautilus_plateau",
      name: "Nautilus Plateau"
    },
    {
      link: "/petrol_bay",
      name: "Petrol Bay"
    },
    {
      link: "/grand_haven",
      name: "Grand Haven"
    },
    {
      link: "/jugband_hills",
      name: "Jugband Hills"
    },
    {
      link: "/cottonwood_forest",
      name: "Cottonwood Forest"
    }
  ];

  constructor(private http: HttpClient) {
    this.http.get<any>('assets/data.json').subscribe(data => {
      this.materialList = data;
      this.tabList = [
        {
          "title": BASE_CITY,
          "port": "5555",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":12,
          "commercialCount":15
        },
        {
          "title": BARLEYCORN_POINT,
          "port": "5895",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":9,
          "commercialCount":7
        },
        {
          "title": SUNSHINE_VALLEY,
          "port": "5905",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":9,
          "commercialCount":7
        },
        {
          "title": TRADERS_RIDGE,
          "port": "5915",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":7,
          "commercialCount":7
        },
        {
          "title": MAGNOLIA_WETLANDS,
          "port": "5925",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":12,
          "commercialCount":15
        },
        {
          "title": HOKUSAI_CLIFFS,
          "port": "6025",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":12,
          "commercialCount":15
        },
        {
          "title": NAUTILUS_PLATEAU,
          "port": "5945",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":12,
          "commercialCount":15
        },
        {
          "title": PETROL_BAY,
          "port": "5955",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":12,
          "commercialCount":15
        },
        {
          "title": GRAND_HAVEN,
          "port": "5965",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":12,
          "commercialCount":15
        },
        {
          "title": JUGBAND_HILLS,
          "port": "5985",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":12,
          "commercialCount":15
        },
        {
          "title": COTTONWOOD_FOREST,
          "port": "6005",
          "actions": this.actionsValues,
          "materialList":this.materialList,
          "factoriesCount":12,
          "commercialCount":15
        }
      ];
    });

  }

  onTabChange(event: any) {
    this.selectedTab = event.index;
  }

  onSidenavToggle(isOpened: boolean) {
    console.log('Sidenav is opened: ', isOpened);
  }

  selectRoute(index:number){
    this.selectedRoute = index;
  }

  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }

  convertData(data:any){
    let result = [];
    for(let key of Object.keys(data)){
      let materialList = [];
      for(let materialkey of Object.keys(data[key])){
        let materialInfo = {
          materialName: materialkey,
          materialInfo: data[key][materialkey]
        }
        materialList.push(materialInfo);
      }
      let buildingObject = {
        buildingName: key,
        materialList: materialList
      }
      result.push(buildingObject);
    }
    console.log(JSON.stringify(result));
  }

  clearMaterials(){

  }

}
