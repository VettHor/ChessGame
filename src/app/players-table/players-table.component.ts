import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PlayerAddEditComponent } from '../player-add-edit/player-add-edit.component';
import { PlayersTableDataSource, PlayersTableItem } from './players-table-datasource';
import { PlayerDialogGetByIdComponent } from '../player-dialog-get-by-id/player-dialog-get-by-id.component';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PlayersTableItem>;
  dataSource: PlayersTableDataSource = new PlayersTableDataSource([]);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'password', 'level', 'action'];

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.httpClient.get<PlayersTableItem[]>('https://localhost:44385/api/User/get_players').subscribe(
      response => {
        this.dataSource = new PlayersTableDataSource(response);
        this.table.dataSource = this.dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  onDeletePlayer(id: string) {
    this.httpClient.delete<any>(`https://localhost:44385/api/User/delete/${id}`).subscribe(
      () => this.getAllPlayers()
    );
  }

  onAddPlayer() {
    this.dialog.open(PlayerAddEditComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save') {
        this.getAllPlayers();
      }
    });
  }

  onEditPlayer(row: any) {
    this.dialog.open(PlayerAddEditComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllPlayers();
      }
    });
  }

  onGetById(id: any) {
    this.dialog.open(PlayerDialogGetByIdComponent, {
      width: '30%',
      data: id
    });
  }
}
