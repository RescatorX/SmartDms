import {Injectable} from '@angular/core';
import {
    Validators as NgValidators,
    ValidatorFn,
    FormGroup,
    AbstractControl,
    FormArray,
    FormControl, ValidationErrors
} from '@angular/forms';
import {Subscriber} from 'rxjs/Subscriber';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

// @dynamic
@Injectable()
export class Validators extends NgValidators {
    public static asyncValidatorFactory(asyncFunc: (subscriber: Subscriber<object>, control?: AbstractControl) => void,
                                        options: {debounce?: number} = {}) {
        const defaultConfig = {debounce: 500};
        const config = Object.assign({}, defaultConfig, options);
        const self = this;
        let debounceTimeout: any;
        let subscriptions$$: Subscription;

        return (control: AbstractControl): Observable<object> => {
            const subject = new Subject<object>();
            if (control.pristine) {
                subject.next(null);
                subject.complete();
                return subject.asObservable();
            }

            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
                debounceTimeout = undefined;

                if (subscriptions$$) {
                    subscriptions$$.unsubscribe();
                }
            }

            debounceTimeout = setTimeout(() => {
                debounceTimeout = undefined;
                asyncFunc.bind(self)(subject, control);
            }, config.debounce);

            // Subject is fired inside asyncFunc
            subscriptions$$ = subject.first().subscribe(() => {
                setTimeout(() => subject.complete(), 0);
            });

            return subject.asObservable();
        };
    }

    public static minLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            const controlValue = control.value || '';

            // if the control is not required empty field is valid
            if (controlValue.length === 0 && !Validators.hasRequiredField(control)) {
                return null;
            }

            if (controlValue.length < minLength) {
                return {minlength: true};
            }

            return null;
        };
    }

    static pattern(pattern: string | RegExp): ValidatorFn {
        if (!pattern) {
            return Validators.nullValidator;
        }
        let regex: RegExp;
        if (typeof pattern === 'string') {
            regex = new RegExp(pattern);
        } else {
            regex = pattern;
        }

        return (control: AbstractControl): ValidationErrors => {
            const controlValue = control.value || '';

            // if the control is not required empty field is valid
            if (controlValue.length === 0 && !Validators.hasRequiredField(control)) {
                return null;
            }

            return regex.test(control.value)
                ? null
                : { pattern: true };
        };
    }

    public static atLeastOneInputFilled(trim: boolean, inputNames?: Array<string>): ValidatorFn {
        return (formGroup: FormGroup): ValidationErrors => {
            if (!!inputNames) {
                return this.providedInputsAreFilled(inputNames, formGroup, trim);
            } else {
                return this.allInputsAreFilled(formGroup, trim);
            }
        };
    }

    private static providedInputsAreFilled(inputNames: Array<string>, formGroup: FormGroup, trim: boolean) {
        let isValid = false;
        for (let inputName of inputNames) {
            const control = formGroup.get(inputName);
            isValid = isValid || this.atLeastOneAbstractControlFilled(control, trim);
        }
        return isValid ? null : {'fill at least one of: ': {inputNames}}; // TODO
    }

    private static allInputsAreFilled(formGroup: FormGroup, trim: boolean): any {
        const isValid = this.atLeastOneAbstractControlFilled(formGroup, trim);
        return isValid ? null : {'fill at least one input field': 'all are empty'}; // TODO
    }

    private static atLeastOneAbstractControlFilled(ac: AbstractControl, trim: boolean): boolean {
        let result = false;
        if (ac instanceof FormGroup) {
            // Iterate form group
            const fg = <FormGroup>ac;
            Object.keys(ac.controls).forEach((key: string) => {
                const fgAc = <AbstractControl>fg.get(key);
                result = result || this.atLeastOneAbstractControlFilled(fgAc, trim);
            });
        } else if (ac instanceof FormArray) {
            // Iterate form array
            const fa = <FormArray>ac;
            fa.controls.forEach((faAc: AbstractControl) => {
                result = result || this.atLeastOneAbstractControlFilled(faAc, trim);
            });
        } else if (ac instanceof FormControl) {
            // Iterate form control
            // End of recursion
            const fc = <FormControl>ac;
            // Trim if string and trim set to true
            const val = (typeof fc.value === 'string' && trim) ? fc.value.trim() : fc.value;
            result = result || val;
        }
        return result;
    }

    private static hasRequiredField (control: AbstractControl): boolean {
        if (control.validator) {
            // Custom control for checking if required validator is on the control
            const customCtrl = new FormControl(null, null);
            customCtrl.markAsDirty();

            const validatorResult = control.validator(customCtrl) || {};
            return validatorResult.hasOwnProperty('required');
        }

        return false;
    }
}
