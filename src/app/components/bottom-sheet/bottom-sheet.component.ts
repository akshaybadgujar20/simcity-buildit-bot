import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {
  ADD_COMMERCIAL_MATERIAL_TO_PRODUCTION, ADD_RAW_MATERIAL_TO_PRODUCTION,
  ADVERTISE_ITEM_ON_TRADE_DEPOT,
  COLLECT_FROM_COMMERCIAL,
  COLLECT_FROM_FACTORY, COLLECT_SOLD_ITEM_MONEY,
  CONTINUOUS_BUY,
  SELL_WITH_FULL_VALUE,
  SELL_WITH_ZERO_VALUE
} from "../../constants/city.actions";
import {MatButtonModule} from "@angular/material/button";
import {SharedDataService} from "../../services/shared-data.service";


@Component({
  selector: 'app-action-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
  encapsulation: ViewEncapsulation.None // Disable encapsulation
})
export class BottomSheetComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetComponent>>(MatBottomSheetRef);

  constructor(private sharedDataService:SharedDataService) {
  }

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

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  peformAction(action: any, index: number){
    this.sharedDataService.performAction(action, index);
  }
}

