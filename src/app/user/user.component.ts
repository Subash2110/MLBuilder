import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: false
})

export class UserComponent implements OnInit {

  formVisible: boolean = false;
  form!: FormGroup;
  editMode: boolean = false;
  editUserId: number | null = null;
  storageKey = 'users';
  userName: string = '';

  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);

  displayedColumns: string[] = ['id', 'userName', 'email', 'action'];
  nextUserId: number = 1;

  @ViewChild(MatTable) table!: MatTable<User>;
  @ViewChild('deleteDialog') deleteDialogTemplate!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userName = user.userName;
  }

  initForm(): void {
    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  loadUsers(): void {

    const storedUsers = localStorage.getItem(this.storageKey);

    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.dataSource.data = [...this.users];
      this.nextUserId =
        this.users.length > 0
          ? Math.max(...this.users.map(user => user.id)) + 1
          : 1;
    }
  }

  onSubmit(): void {

    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.editMode && this.editUserId !== null) {
        const index = this.users.findIndex(
          user => user.id === this.editUserId
        );

        if (index !== -1) {
          this.users[index] = {
            id: this.editUserId,
            userName: formValue.userName,
            email: formValue.email,
            password: formValue.password
          };
        }

      } else {
        const newUser: User = {
          id: this.nextUserId++,
          userName: formValue.userName,
          email: formValue.email,
          password: formValue.password
        };

        this.users.push(newUser);
      }

      this.saveUsersToLocalStorage();
      this.dataSource.data = [...this.users];
      this.form.reset();
      this.formVisible = false;
      this.editMode = false;
      this.editUserId = null;
    }
  }

  showForm(): void {
    this.formVisible = true;
    this.editMode = false;
    this.form.reset();
  }

  closeForm(): void {
    this.formVisible = false;
  }

  // deleteUser(id: number): void {
  //   this.users = this.users.filter(user => user.id !== id);
  //   this.users = this.users.map((user, index) => ({
  //     ...user,
  //     id: index + 1
  //   }));
  //   this.dataSource.data = [...this.users];
  // }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.deleteUser(id);
    }
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDialogTemplate, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }

  showEditForm(user: User): void {
    this.formVisible = true;
    this.editMode = true;
    this.editUserId = user.id;

    this.form.setValue({
      userName: user.userName,
      email: user.email,
      password: user.password
    });
  }

  saveUsersToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }

  deleteUser(id: number): void {

    this.users = this.users.filter(
      user => user.id !== id
    );

    this.dataSource.data = [...this.users];
    this.saveUsersToLocalStorage();
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
