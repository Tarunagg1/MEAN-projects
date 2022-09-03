import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SnakebarservicesService } from 'src/app/services/snakebarservices.service';
import { GlobalConstant } from 'src/app/shared/global-constant';
import { CatgoryComponent } from '../catgory/catgory.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss'],
})
export class ManageCategoryComponent implements OnInit {
  displayedColumn: string[] = ['name', 'edit'];
  dataSource: any;
  responseMsg: any;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snakeBarService: SnakebarservicesService
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.categoryService.getCategory().subscribe(
      (response: any) => {
        this.responseMsg = response?.message;
        this.dataSource = response.data;
      },
      (error: any) => {
        if (error?.error?.message) {
          this.responseMsg = error?.error?.message;
        } else {
          this.responseMsg = GlobalConstant.genericError;
        }
        this.snakeBarService.openSnakeBar(this.responseMsg, 'error');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  AddCategoryAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CatgoryComponent, dialogConfig);
    this.router.events.subscribe((event) => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddCategory.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handelEditAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id:value,
      action: 'Edit',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CatgoryComponent, dialogConfig);
    this.router.events.subscribe((event) => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditCategory.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }
}
