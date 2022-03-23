import { Validators } from '@angular/forms';


export const EmailValidation = [Validators.required, Validators.email];

export const PasswordValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
];

