import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedDataService} from "../../services/shared-data.service";

@Component({
  selector: 'app-action-view',
  templateUrl: './action-view.component.html',
  styleUrl: './action-view.component.scss'
})
export class ActionViewComponent implements OnInit{

  cityData: any;
  selectedOptions: string[] = [];
  selectedIndex: any;
  selectedItemNameList:any[] = [];

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

  constructor(private http: HttpClient, private sharedDataService: SharedDataService) {
    this.cityData = this.sharedDataService.cityDataList[this.sharedDataService.selectedRouteIndex];
  }

  ngOnInit() {
    this.sharedDataService.actionTrigger$.subscribe(() => {
      this.clearAllChips();
    });
  }

  performAction(action:any,index:number){
    this.selectedOptions = [];
    if(this.selectedIndex === index){
      this.selectedIndex = -1;
    } else{
      this.selectedIndex = index;
    }
    const request = {
      port: this.cityData.port,
      action: action.function_call,
      commercialCount: this.cityData.commercialCount,
      factoriesCount: this.cityData.factoriesCount,
      selectedMaterials: this.selectedItemNameList.map(material => material.label)
    }
    this.http.post<any>('http://127.0.0.1:5000/perform/action', request).subscribe(response=>{
      console.log(response)
    });
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

