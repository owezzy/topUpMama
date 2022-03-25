import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User2Service} from "../user2.service";
import { User, UserSchema} from "../users/model/user";
import {NgForm} from "@angular/forms";
import {UserService} from "../users/services/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDialogComponent} from "../users/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-users2',
  templateUrl: './users2.component.html',
  styles: [
    `    img { width: 50px; height: 50px; padding: 0; margin: 0;}
    table {
      width: 100%;
      height: 100%;
    }
    `
  ]
})
export class Users2Component implements OnInit {

  // displayedColumns: string[] = ['first_name','last_name', 'email', 'avatar', 'name', 'job_title'];
  displayedColumns: string[] = Object.keys(UserSchema);
  dataSchema = UserSchema;
  dataSource = new MatTableDataSource<User>();
  itemsPerPage!: number;
  currentPage!: number;
  selection = new SelectionModel<User>(true, []);

  constructor(private eDataStore: User2Service,
              private userService: UserService,
  public dialog: MatDialog,
) {
  }

  @ViewChild('testForm') testForm!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {
    this.userService.getUsers().subscribe((res) => {
      this.itemsPerPage = res.per_page;
      this.currentPage = res.pages;
      this.dataSource.data = res.data;

      console.log(this.dataSource.data)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  save(form: NgForm): void {
    console.log('Form Status', form.valid);
    console.log('Form Touched', form.touched);
    console.log('Form Untouch', form.untouched);
    console.log('Form Invalid', form.invalid);
    console.log('Form Pristine', form.pristine);
    console.log('Form Values', form.value);
    // do API operation
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  editRow(row: User) {
    if (row.id === 0) {
      this.userService.addUser(row).subscribe(res => {
        row.id = res.id;
        row.isEdit = false;
      });
    } else {
      this.userService.updateUser(row).subscribe(() => row.isEdit = false);
    }
  }

  addRow() {
    const newRow: User = {id: 0, first_name: "",last_name: "", email: "", avatar: "", isEdit: true, isSelected: false}
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((u: User) => u.id !== id);
    });
  }

  removeSelectedRows() {
    const users = this.dataSource.data.filter((u: User) => u.isSelected);
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.userService.deleteUsers(users).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((u: User) => !u.isSelected);
        });
      }
    });
  }
}
