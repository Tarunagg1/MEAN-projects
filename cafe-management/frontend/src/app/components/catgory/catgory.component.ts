import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnakebarservicesService } from 'src/app/services/snakebarservices.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-catgory',
  templateUrl: './catgory.component.html',
  styleUrls: ['./catgory.component.scss'],
})
export class CatgoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any;
  responseMsg: any;
  dialogAction: any = 'Add';

  action: any = 'Add';
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CatgoryComponent>,
    private snakeBarService: SnakebarservicesService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    if(this.dialogData.action === 'Edit') {
        this.dialogAction = "Edit";
        this.action = "Update";
        this.categoryForm.patchValue(this.dialogData.id)
    }
  }

  handelSubmit(){
    console.log(this.dialogData);

    if(this.action === "Add"){
      this.addCategory();
    }else if(this.action === "Update"){
      this.editCategory();
    }
  }

  addCategory(){
    const formData = this.categoryForm.value;

    const data = {
      name:formData.name
    }

    this.categoryService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMsg = response?.message;
        this.snakeBarService.openSnakeBar(this.responseMsg, '');
        // this.router.navigate(['/cafe/dashboard']);
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

  editCategory(){
    const formData = this.categoryForm.value;

    const data = {
      id:this.dialogData.id.id,
      name:formData.name
    }

    this.categoryService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMsg = response?.message;
        this.snakeBarService.openSnakeBar(this.responseMsg, '');
        // this.router.navigate(['/cafe/dashboard']);
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


}
