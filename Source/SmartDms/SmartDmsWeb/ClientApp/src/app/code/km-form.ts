import { BaseEntity } from "../entities/base.entity";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "./validators";
import { DataTypes } from "./data-types";

export class KmControl {
    public name?;
    required?;
    theme?;
    value?;
    label?;
    placeholder?;
    formControl?: FormControl;
    dataType?: DataTypes;
    data?: any;
}

export class KmForm {

    public inputForm: FormGroup;

    public controls: KmControl[] = [];

    initControl: KmControl = {
        name: "",
        required: true,
        theme: "material",
        value: undefined,
        label: undefined,
        formControl: undefined,
        placeholder: undefined,
        dataType: DataTypes.default,
        data: {}
    };


    constructor(inputForm: FormGroup, initData: KmControl[], res) {
        this.inputForm = inputForm;
        initData.forEach(control => {
            let c: KmControl = control as KmControl;

            BaseEntity.copyProperties(this.initControl, c, false);
            let validator = undefined;
            if (c.required) {
                validator = Validators.required;
            }
            c.formControl = new FormControl("", validator);
            this.inputForm.addControl(c.name, c.formControl);

            c.label = res[c.name];
            c.placeholder = res[c.name];

            this.controls.push(c);
        });
    }

    public clearValues() {
        this.controls.forEach(c => c.value = undefined);
    }
}