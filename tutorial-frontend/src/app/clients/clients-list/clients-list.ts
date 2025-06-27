import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Clients } from '../model/Clients';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ClientsEdit } from '../clients-edit/clients-edit';
import { ClientsService } from '../clientsService';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
    selector: 'app-clients-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './clients-list.html',
    styleUrl: './clients-list.scss'
})
export class ClientsList implements OnInit{

    dataSource = new MatTableDataSource<Clients>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    constructor( private clientsService: ClientsService, public dialog: MatDialog) { }

    ngOnInit(): void {
            this.clientsService.getClients().subscribe(
           clients => this.dataSource.data = clients);
    }

    createClients() {    
    const dialogRef = this.dialog.open(ClientsEdit, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  }  

    editClients(clients: Clients) {
    const dialogRef = this.dialog.open(ClientsEdit, {
      data: { clients }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

    deleteClients(clients: Clients) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientsService.deleteClients(clients.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  } 
}
