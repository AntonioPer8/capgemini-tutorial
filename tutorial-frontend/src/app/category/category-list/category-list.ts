import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/Category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../categoryService';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEdit } from '../category-edit/category-edit';
 import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './category-list.html',
    styleUrl: './category-list.scss'
})
export class CategoryList implements OnInit{

    dataSource = new MatTableDataSource<Category>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    constructor(private categoryService: CategoryService,public dialog: MatDialog,) { }

    ngOnInit(): void {
              this.categoryService.getCategories().subscribe(
            categories => this.dataSource.data = categories);
    }

      createCategory() {    
    const dialogRef = this.dialog.open(CategoryEdit, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  } 
    editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEdit, {
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

    deleteCategory(category: Category) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar categoría", description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(category.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  
}
