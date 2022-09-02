import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { SnakebarservicesService } from 'src/app/services/snakebarservices.service';
import { Router } from '@angular/router';
import { GlobalConstant } from 'src/app/shared/global-constant';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  displayedColumn: string[] = ['name', 'edit'];
  dataSource: any;
  responseMsg: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog,
    private snakeBarService: SnakebarservicesService
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  AddProductAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe((event) => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddCategory.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  tableData() {
    this.productService.getProduct().subscribe(
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

  handelEditAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id:value,
      action: 'Edit',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe((event) => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddCategory.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }
}
