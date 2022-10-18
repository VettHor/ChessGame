import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { GamesTableDataSource, GamesTableItem } from './games-table-datasource';
import { DialogComponent } from '../dialog/dialog.component';
import { GameDialogGetByIdComponent } from '../game-dialog-get-by-id/game-dialog-get-by-id.component';

@Component({
  selector: 'app-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.css']
})
export class GamesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GamesTableItem>;
  dataSource: GamesTableDataSource = new GamesTableDataSource([]);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'player1ID', 'player2ID', 'gameTime', 'editAndDeleteGame'];

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this.httpClient.get<GamesTableItem[]>('https://localhost:44385/api/Game/get_games').subscribe(
      response => {
        this.dataSource = new GamesTableDataSource(response);
        this.table.dataSource = this.dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  onDeleteGame(id: string) {
    this.httpClient.delete<any>(`https://localhost:44385/api/Game/delete/${id}`).subscribe(
      () => this.getAllGames()
    );
  }

  onAddGame() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save') {
        this.getAllGames();
      }
    });
  }

  onEditGame(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllGames();
      }
    });
  }

  onGetById(id: any) {
    this.dialog.open(GameDialogGetByIdComponent, {
      width: '30%',
      data: id
    });
  }
}
