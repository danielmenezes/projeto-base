import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { InputsComponent } from './inputs/inputs.component';
import { HttpClient } from '@angular/common/http';
import { ColumnsTableModel } from './table.model';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    InputsComponent
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: ColumnsTableModel[] = [];
  @Input() localData: any[] = []; // Dados locais
  @Input() dataUrl: string | null = null; // URL para buscar dados

  @Output() itemChanged = new EventEmitter();

  dataSource = new MatTableDataSource<any>([]); // Fonte de dados da tabela
  totalItems = 0; // Total de itens (paginação)
  pageSize = 5; // Itens por página
  currentPage = 0; // Página atual
  sortActive: string | null = null; // Coluna atualmente ordenada
  sortDirection: string | null = null; // Direção da ordenação ('asc' ou 'desc')

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    if (this.sort && !this.dataUrl) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  loadData() {
    if(this.localData.length) {
      this.dataSource.data = this.localData;
    }
    else if(this.dataUrl) {

      const params = {
        page: this.currentPage.toString(),
        size: this.pageSize.toString(),
        sortColumn: this.sortActive || '',
        sortDirection: this.sortDirection || ''
      };
      this.http.get<any>(this.dataUrl, { params }).subscribe((response) => {
        this.dataSource.data = response.data;
        this.totalItems = response.totalItems;
      });
    }
  }


  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  onValueChange(element: any, columnKey: string, index: number) {
    this.itemChanged.emit({ element, columnKey, index });
  }

  get displayedColumns() {
    return this.columns.map((col) => col.key);
  }
}
