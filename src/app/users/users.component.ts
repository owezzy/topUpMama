import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User, UserSchema} from "./model/user";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "./services/user.service";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
    `table {
      width: 100%;
      height: 100%;
    }
    img { width: 50px; height: 50px; margin: 8px}
    `
  ]
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = Object.keys(UserSchema);
  dataSchema = UserSchema;
  dataSource = new MatTableDataSource<User>();
  itemsPerPage!: number;
  currentPage!: number;

  constructor(
    public dialog: MatDialog, private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      console.error(res)
      this.itemsPerPage = res.per_page;
      this.currentPage = res.pages;
      this.dataSource.data = res.data;

    });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

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
    const users= this.dataSource.data.filter((u: User) => u.isSelected);
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.userService.deleteUsers(users).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((u: User) => !u.isSelected);
        });
      }
    });
  }
}


