import {Component, inject, ViewChild} from '@angular/core';
import {ActionViewComponent} from "./components/action-view/action-view.component";
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from "./components/bottom-sheet/bottom-sheet.component";
import {SharedDataService} from "./services/shared-data.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {
  ADD_COMMERCIAL_MATERIAL_TO_PRODUCTION, ADD_RAW_MATERIAL_TO_PRODUCTION,
  ADVERTISE_ITEM_ON_TRADE_DEPOT,
  COLLECT_FROM_COMMERCIAL,
  COLLECT_FROM_FACTORY, COLLECT_SOLD_ITEM_MONEY,
  CONTINUOUS_BUY,
  SELL_WITH_FULL_VALUE,
  SELL_WITH_ZERO_VALUE
} from "./constants/city.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simcity-buildit-bot';
  selectedTab: any = 0;
  materialList: any;
  cityDataList: any;
  showFiller = false;
  cityName: string = '';
  selectedRouteIndex = -1;
  welcomeMessage = 'Welcome to Simcity Bot';
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


  @ViewChild(ActionViewComponent) actionViewComponent!: ActionViewComponent;

  constructor(private sharedDataService:SharedDataService, private router:Router, private http: HttpClient) {

  }

  onSidenavToggle(isOpened: boolean) {
    console.log('Sidenav is opened: ', isOpened);
  }

  selectRoute(route:any ,index:number){
    this.selectedRouteIndex = index;
    this.sharedDataService.selectedRouteIndex = index;
    this.cityName = this.sharedDataService.cityDataList[this.sharedDataService.selectedRouteIndex].title;
    this.router.navigate([route.link], {
      queryParams: {
        "routeIndex": this.selectedRouteIndex
      }
    });
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
    this.actionViewComponent.clearAllChips();
  }

  gotoHome(){
    this.router.navigateByUrl('');
    this.selectedRouteIndex = -1;
    this.sharedDataService.selectedRouteIndex = -1;
  }

  stopAction(){
    this.http.get<any>('http://127.0.0.1:5000/action-stop').subscribe(response=>{
      console.log(response)
    });
  }

}
