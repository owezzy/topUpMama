import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { userDetails } from '../users/model/user';
import {UserService} from "../users/services/user.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserEditComponent implements OnInit {

  @Input() userDetails!: userDetails;
  @Output() submitted = new EventEmitter<userDetails>();
  form!: FormGroup;
  localData: any

  constructor(private userService: UserService,
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.localData = this.authService.userValue

    this.form = this.fb.group({
      name: [this.localData.name, Validators.required],
      job_title: [this.localData.job_title, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    // @ts-ignore
    if (changes.userDetails?.currentValue) {
      this.form?.patchValue(this.userDetails);
    }
  }

  get name() { return this.form.get('name'); }
  get job_title() { return this.form.get('job_title'); }

  submit(data:any) {
    this.submitted.emit(data);
    return this.form.reset();
  }

}
