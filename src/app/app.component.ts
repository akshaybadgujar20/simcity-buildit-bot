import {Component, inject, ViewChild} from '@angular/core';
import {ActionViewComponent} from "./components/action-view/action-view.component";
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from "./components/bottom-sheet/bottom-sheet.component";
import {SharedDataService} from "./services/shared-data.service";
import {Router} from "@angular/router";

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
  selectedRoute = -1;
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
  @ViewChild(ActionViewComponent, { static: false }) actionViewComponent!: ActionViewComponent;
  private _bottomSheet = inject(MatBottomSheet);

  constructor(private sharedDataService:SharedDataService, private router:Router) {

  }

  onTabChange(event: any) {
    this.selectedTab = event.index;
  }

  onSidenavToggle(isOpened: boolean) {
    console.log('Sidenav is opened: ', isOpened);
  }

  selectRoute(route:any ,index:number){
    this.selectedRoute = index;
    this.sharedDataService.selectedRouteIndex = index;
    this.cityName = this.sharedDataService.cityDataList[this.sharedDataService.selectedRouteIndex].title;
    this.router.navigateByUrl(route.link);
  }

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
    this.sharedDataService.triggerAction();
  }

  gotoHome(){
    this.router.navigateByUrl('');
  }
}
