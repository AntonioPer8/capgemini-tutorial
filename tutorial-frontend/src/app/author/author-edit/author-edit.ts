import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from '../authorService';
import { Author } from '../model/Author';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-author-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './author-edit.html',
    styleUrl: './author-edit.scss',
})
export class AuthorEdit implements OnInit {
    author: Author;

    constructor(
        public dialogRef: MatDialogRef<AuthorEdit>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authorService: AuthorService
    ) {}

    ngOnInit(): void {
        this.author = this.data.author ? Object.assign({}, this.data.author) : new Author();
    }

    onSave() {
        this.authorService.saveAuthor(this.author).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
