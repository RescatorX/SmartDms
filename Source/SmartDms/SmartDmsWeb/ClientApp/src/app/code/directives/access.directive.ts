import { Directive, OnInit, OnDestroy, Output, ViewContainerRef, TemplateRef, Input } from "@angular/core";
import { AccessService } from "../../services/access.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";

/**
 * Návrh služby na kontrolu UI oprávnění - vykreslování podle pravidel.
 * U komponenty se pomcí direktivy *kmAccess="'user.U'" u html elementu řekne, o jakou entitu se jedná a služba pak ve vnitřní kolekci nastavení (todo: přesunout) zkontroluje, jaká role je potřeba pro zobrazení entity.
 * accessData kolekce je samopopisující. Časem by se mohla rozšířit o možnost zadat deny.
 * Jedná se o poměrně primitivní implementaci. Jakmile bude potřebovat nějaké složitější řízení oprávnění, pak je možné ji rozšiřovat.
 * možné rozšíření: přidat permission, deny param. Umožnit zadávat i zdroje (např services)
 */
@Directive({
    selector: '[kmAccess]'
})
export class AccessDirective implements OnInit, OnDestroy {

    isAuthorized: boolean = false;
    hasView: boolean = false;
    userSubscription: Subscription;
    condition: boolean = true;

    /**
     * Moznost zapisu: *kmAccess="'documents.export'; ngIf selectedDocuments.length > 0"
     */
    @Input() set kmAccessNgIf(condition) {
        this.condition = condition;
        if (condition) {
            this.show();
        } else {
            this.hide();
        }
    }

    @Input() set kmAccess(entity: string) {
        //zrejme dorbna optimalizace, ale myslim, ze nema uplne vyznam
        if (!this.condition) {
            this.hide();
            return;
        }
        this.userSubscription = this.userService.user$.filter(u => u.isInicalized).subscribe(u => {
            if (this.accessService.validateAccess(u, entity)) {
                this.show();
            } else {
                this.hide();
            }
        });
    }
    constructor(
        private accessService: AccessService,
        private userService: UserService,
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>
    ) {

    }

    show() {
        if (!this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        }
    }
    hide() {
        this.viewContainer.clear();
        this.hasView = false;
    }
    ngOnInit(): void {
        // this.viewContainer.clear();
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}