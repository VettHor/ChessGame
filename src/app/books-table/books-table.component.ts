import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BooksTableDataSource, BooksTableItem } from './books-table-datasource';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BooksTableItem>;
  dataSource: BooksTableDataSource = new BooksTableDataSource([]);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'copyAmount', 'action'];

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.httpClient.get<BooksTableItem[]>('https://localhost:44385/api/Book/get_books').subscribe(
      response => {
        this.dataSource = new BooksTableDataSource(response);
        this.table.dataSource = this.dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  onDeleteBook(id: string) {
    this.httpClient.delete<any>(`https://localhost:44385/api/Book/delete/${id}`).subscribe(
      () => this.getAllBooks()
    );
  }

  onAddBook() {

  }

  onEditBook(row: any) {

  }
}
