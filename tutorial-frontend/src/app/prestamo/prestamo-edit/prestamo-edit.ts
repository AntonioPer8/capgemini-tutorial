import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../../game/gameService';
import { Game } from '../../game/model/Game';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Clients } from '../../clients/model/Clients';
import { ClientsService } from '../../clients/clientsService';
import { PrestamoService } from '../prestamoService';
import { Prestamo} from '../../prestamo/model/Prestamo';


@Component({
    selector: 'app-game-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule ],
    templateUrl: './prestamo-edit.html',
    styleUrl: './prestamo-edit.scss',
})
export class PrestamoEdit implements OnInit {
    filtroGame: Game;
    filtroClients: Clients;
    game: Game[];
    clients: Clients[];
    prestamo: Prestamo;


    constructor(
        public dialogRef: MatDialogRef<PrestamoEdit>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private gameService: GameService,
        private prestamoService: PrestamoService,
        private clientsService: ClientsService
    ) {}

    ngOnInit(): void {
        this.prestamo = this.data.prestamo ? Object.assign({}, this.data.prestamo) : new Prestamo();

        this.gameService.getGames().subscribe((game) => {
            this.game = game;

            if (this.prestamo.nameGame != null) {
                const filtroGame: Game[] = game.filter((game) => game.title == this.data.prestamo.nameGame);
                if (filtroGame != null) {
                    this.prestamo.nameGame = filtroGame[0].title;
                }
            }
        });

        this.clientsService.getClients().subscribe((clients) => {
            this.clients = clients;

            if (this.prestamo.nameClients != null) {
                const filtroClients: Clients[] = clients.filter(
                    (clients) => clients.name == this.data.prestamo.clientname
                );
                if (filtroClients!= null) {
                    this.prestamo.nameClients = filtroClients[0].name;
                }
            }
        });
    }

onSave() {
    this.prestamo.nameGame = this.filtroGame?.title ?? null;
    this.prestamo.nameClients = this.filtroClients?.name ?? null;

    const inicio = new Date(this.prestamo.fechaInicio);
    const fin = new Date(this.prestamo.fechaFin);

    if (fin < inicio) {
        alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
        return;
    }

    const dias = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24);
    if (dias > 14) {
        alert("El préstamo no puede exceder los 14 días.");
        return;
    }

    this.prestamoService.savePrestamo(this.prestamo).subscribe({
        next: () => this.dialogRef.close()

    });
}

    onClose() {
        this.dialogRef.close();
    }
}
