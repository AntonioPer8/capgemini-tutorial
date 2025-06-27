import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clients } from '../model/Clients';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientsService } from '../clientsService';

@Component({
    selector: 'app-clients-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: 'clients-edit.html',
    styleUrl: './clients-edit.scss'
})
export class ClientsEdit implements OnInit {
    clients: Clients;

    constructor(
        public dialogRef: MatDialogRef<ClientsEdit>,
        @Inject(MAT_DIALOG_DATA) public data: { clients: Clients },
        private clientsService: ClientsService 
    ) {}

    ngOnInit(): void {
        this.clients = this.data.clients ? Object.assign({}, this.data.clients) : new Clients();
    }

    onSave() {
        this.clientsService.saveClients(this.clients).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
