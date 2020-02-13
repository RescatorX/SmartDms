import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl, ValidatorFn, FormGroup } from "@angular/forms";




@Directive({
    selector: '[appCustomValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true }]
})
export class CustomValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        return equalInputsValidator(control)
    }
}
export const equalInputsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');
    if (control.touched || control.dirty) {
        if (password && passwordRepeat && password.value !== passwordRepeat.value) {
            password.setErrors({ inputsNotEqual: true });
            passwordRepeat.setErrors({ inputsNotEqual: true });
            return { 'inputsNotEqual': true }
        } else {
            // password.setErrors(null);
            // passwordRepeat.setErrors(null);
            password.setErrors({ inputsNotEqual: null });
            passwordRepeat.setErrors({ inputsNotEqual: null });
            
            return null;
        }
    }
};



/**Jednodusi je nepouzit setError, tezko se pak validacni chyba zpet odstranuje. Neni treba pouzivat ani directivy a cel to spesl obalovat */
export const matchPasswordValidator = (formControl: AbstractControl) => {

    if ((formControl.get('needValidation') != null) && (!formControl.get('needValidation').value)) {
        return true;
    } else {
        const password = formControl.get('password').value;
        const passwordRepeat = formControl.get('passwordRepeat').value;
        let res = password != passwordRepeat ? { matchPassword: true } : null;
        return res;
    }
  };