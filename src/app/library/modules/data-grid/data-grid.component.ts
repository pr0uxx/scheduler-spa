import { Component, Input, OnInit } from '@angular/core';
import { DataGrid } from './classes/data-grid';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  @Input() data?: any[];
  @Input() noDataMessage = 'No data here';

  @Input() grid?: DataGrid;

  constructor(){

  }
  ngOnInit(): void {
    
  }


}
