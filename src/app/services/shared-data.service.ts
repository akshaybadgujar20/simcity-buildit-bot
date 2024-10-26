import { Injectable } from '@angular/core';
import {
  BARLEYCORN_POINT,
  BASE_CITY, COTTONWOOD_FOREST, GRAND_HAVEN,
  HOKUSAI_CLIFFS, JUGBAND_HILLS,
  MAGNOLIA_WETLANDS, NAUTILUS_PLATEAU, PETROL_BAY,
  SUNSHINE_VALLEY,
  TRADERS_RIDGE
} from "../constants/city.names";
import {
  ADD_COMMERCIAL_MATERIAL_TO_PRODUCTION, ADD_RAW_MATERIAL_TO_PRODUCTION,
  ADVERTISE_ITEM_ON_TRADE_DEPOT,
  COLLECT_FROM_COMMERCIAL,
  COLLECT_FROM_FACTORY, COLLECT_SOLD_ITEM_MONEY,
  CONTINUOUS_BUY,
  SELL_WITH_FULL_VALUE,
  SELL_WITH_ZERO_VALUE
} from "../constants/city.actions";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  selectedRouteIndex: number = -1;
  action:any;
  url: string | undefined;
  index: number | undefined;
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
  cityDataList: any[] = [];
  materialList:any[] = [];

  constructor(private http: HttpClient,  private router: Router) {
    this.http.get<any>('assets/data.json').subscribe(data => {
      this.materialList = data;
      this.cityDataList = [
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

    private clearAllChipsAction = new Subject<void>();
    clearAllChipsAction$ = this.clearAllChipsAction.asObservable();

  private performActionTask = new Subject<void>();
  performActionTask$ = this.performActionTask.asObservable();

  clearAllChips() {
    this.clearAllChipsAction.next();
  }

  performAction(action:any, index:number) {
    this.action = action;
    this.index = index;
    this.url = this.router.url;
    this.performActionTask.next();
  }

}
