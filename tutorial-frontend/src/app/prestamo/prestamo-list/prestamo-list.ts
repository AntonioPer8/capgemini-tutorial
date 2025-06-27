import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PrestamoEdit } from '../prestamo-edit/prestamo-edit';
import { PrestamoService } from '../prestamoService';
import { Prestamo } from '../model/Prestamo';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Clients } from '../../clients/model/Clients';
import { Game } from '../../game/model/Game';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../clients/clientsService';
import { GameService } from '../../game/gameService';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-prestamo-list',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule,
        MatPaginatorModule, MatSelectModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
        MatInputModule],
    templateUrl: './prestamo-list.html',
    styleUrl: './prestamo-list.scss',
})
export class PrestamoList implements OnInit {
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;
    clients: Clients[];
    game: Game[];
    prestamos: Prestamo[];
    filtroClients: Clients;
    filtroGame: Game;
    filtroDate: Date;

    dataSource = new MatTableDataSource<Prestamo>();
    displayedColumns: string[] = ['id', 'nameGame', 'nameClient', 'fechaInicio', 'fechaFin', 'action'];

    constructor(
        private prestamoService: PrestamoService,
        private gameService: GameService,
        private clientsService: ClientsService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadPage();

        this.gameService.getGames().subscribe(games => this.game = games);
        this.clientsService.getClients().subscribe(clients => this.clients = clients);
    }

    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        this.prestamoService.getPrestamos(pageable).subscribe((data) => {
            console.log("nameclients: ", data.content.map(prestamo => prestamo.nameClients));
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    onCleanFilter(): void {
        this.filtroGame = null;
        this.filtroClients = null;
        this.filtroDate = null;
        this.onSearch();
    }

    onSearch(): void {
        const filters = {
            nameClient: this.filtroClients?.name || null,
            nameGame: this.filtroGame?.title || null,
            date: this.filtroDate instanceof Date && !isNaN(this.filtroDate.getTime())
                ? this.formatDateToLocalString(this.filtroDate)
                : null
        };

        const pageable: Pageable = {
            pageNumber: 0,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                }
            ]
        };

        this.prestamoService.getPrestamos(pageable, filters).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    createPrestamo() {
        const dialogRef = this.dialog.open(PrestamoEdit, {
            data: {},
        });

        dialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
        });
    }

    editPrestamo(prestamo: Prestamo) {
        const dialogRef = this.dialog.open(PrestamoEdit, {
            data: { prestamo: prestamo },
        });

        dialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
        });
    }

    deletePrestamo(prestamo: Prestamo) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar prestamo',
                description:
                    'Atención si borra el prestamo se perderán sus datos.<br> ¿Desea eliminar el prestamo?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.prestamoService.deletePrestamo(prestamo.id).subscribe(() => {
                    this.ngOnInit();
                });
            }
        });
    }

    
    private formatDateToLocalString(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return year + '-'+ month + '-' +day;
    }
}