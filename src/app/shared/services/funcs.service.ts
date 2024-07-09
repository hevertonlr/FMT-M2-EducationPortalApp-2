import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FuncsService {
  form: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({});
  }

  set setForm(form: FormGroup){
    this.form = form;
  } 

  
  validateInput = (inputName: string) =>
    this.inputHasError(inputName)
      ? 'hasError'
      : this.inputHasSuccess(inputName)
      ? 'hasSuccess'
      : '';

  getInputErrorMessage = (inputName: string) => {
    const errors = this.form.get(inputName)?.errors;
    if (!errors) return;
    if (errors['required']) return 'Campo obrigatório!';
    if (errors['email']) return 'Informe um endereço de e-mail válido.';

    return 'Campo Inválido';
  };

  private inputHasError = (inputName: string) =>
    (this.form.controls[inputName].dirty ||
      this.form.controls[inputName].touched) &&
    this.form.controls[inputName].invalid;

  private inputHasSuccess = (inputName: string) =>
    this.form.controls[inputName].dirty &&
    this.form.controls[inputName].touched &&
    this.form.controls[inputName].valid;
}
