import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { KmInputComponent } from '@konicaminolta/ng-components/forms/km-input/km-input.component';

@Directive({
    selector: '[autoInput]'
})
export class AutoInputDirective implements OnInit {
    constructor(private elRef: ElementRef, private renderer: Renderer2, private configService: ConfigService) {
       
        //nefunguje podle predstav
        
        // let control = this.elRef.nativeElement;
        // control = control as KmInputComponent;
        // if (control) {
        //     let controlName = control.formControlName;
        //     // control.label = this.configService.res["report"][controlName];
        //     // control.placeholder = control.label;
        //     // control.theme = "material";
        //     this.renderer.setProperty(control, "label", this.configService.res["report"][controlName]);
        //     this.renderer.setProperty(control, "placeholder", this.configService.res["report"][controlName]);
        //     this.renderer.setProperty(control, "theme", "material");
        // }
    }

    ngOnInit(){
    }
}