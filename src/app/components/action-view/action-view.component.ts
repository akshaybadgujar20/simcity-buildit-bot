import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedDataService} from "../../services/shared-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  ADD_COMMERCIAL_MATERIAL_TO_PRODUCTION, ADD_RAW_MATERIAL_TO_PRODUCTION,
  ADVERTISE_ITEM_ON_TRADE_DEPOT,
  COLLECT_FROM_COMMERCIAL,
  COLLECT_FROM_FACTORY, COLLECT_SOLD_ITEM_MONEY,
  CONTINUOUS_BUY,
  SELL_WITH_FULL_VALUE,
  SELL_WITH_ZERO_VALUE
} from "../../constants/city.actions";

@Component({
  selector: 'app-action-view',
  templateUrl: './action-view.component.html',
  styleUrl: './action-view.component.scss'
})
export class ActionViewComponent implements OnInit, OnDestroy{

  cityData: any;
  selectedOptions: string[] = [];
  selectedIndex: any;
  selectedItemNameList:any[] = [];
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
  routeIndex = -1;
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
  constructor(private http: HttpClient, private sharedDataService: SharedDataService, private activatedRoute: ActivatedRoute, private router:Router) {
    this.cityData = this.sharedDataService.cityDataList[this.sharedDataService.selectedRouteIndex];
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.routeIndex = parseInt(<string>params.get('routeIndex'));
      console.log('Query Params - routeIndex:', this.routeIndex);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('ngOnDestroy called')
  }

  performAction(action: any){
    if(this.router.url.slice(0,this.router.url.indexOf('?')) === this.routerLinkList[this.routeIndex].link){
      this.selectedOptions = [];
      if(this.selectedIndex === this.routeIndex){
        this.selectedIndex = -1;
      } else{
        this.selectedIndex = this.routeIndex;
      }
      const request = {
        port: this.cityData.port,
        action: action.function_call,
        commercialCount: this.cityData.commercialCount,
        factoriesCount: this.cityData.factoriesCount,
        selectedMaterials: this.selectedItemNameList.map(material => material.name)
      }
      console.log("API call");
      this.http.post<any>('http://192.168.8.133:5000/action-perform', request).subscribe(response=>{
        console.log(response)
      });
    }
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

  getImageUrl(materialInfo:any){
    return materialInfo.imgUrl;
  }
}

