import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseEnumCollectionEntity } from '../entities/base-enum.entity';
import { Utils } from '../code/utils';

import * as resource from "./../../assets/data/resource-data-cs.json";
import * as config from "./../../assets/data/config-data.json";
import { BehaviorSubject } from 'rxjs';
// var resource = require("./../../assets/data/resource-data-cs.json");

@Injectable()
export class ConfigService {

    public url: string = "./../../assets/data/config-data.json";
    public resUrl: string = "./../../assets/data/resource-data-cs.json";
    public languages: {key: string, flagValue: string, urlValue: string}[] = [
        { "key": "cs", "flagValue": "assets/template/media/flags/149-czech-republic.svg", "urlValue": "./../../assets/data/resource-data-cs.json" },
        { "key": "sk", "flagValue": "assets/template/media/flags/091-slovakia.svg", "urlValue": "./../../assets/data/resource-data-sk.json" },
        { "key": "en", "flagValue": "assets/template/media/flags/226-united-states.svg", "urlValue": "./../../assets/data/resource-data-en.json" }
    ];

    config: {} = config;

    data: BaseEnumCollectionEntity = undefined;
    data$: Observable<BaseEnumCollectionEntity>;

    public res: any = resource;
    public res$: BehaviorSubject<any>;

    resFlat: {}[];

    public currentLanguage: string = "cs";
    public currentLanguage$: BehaviorSubject<string>;
    public currentFlag: string = "assets/template/media/flags/149-czech-republic.svg";
    public currentFlag$: BehaviorSubject<string>;

    constructor(private http: HttpClient) {
        // this.getData().subscribe(d => this.data = d);

        this.res$ = <BehaviorSubject<any>>new BehaviorSubject({});
        this.currentLanguage$ = <BehaviorSubject<string>>new BehaviorSubject("");
        this.currentFlag$ = <BehaviorSubject<string>>new BehaviorSubject("");

        this.getResources();
        //let kmcUser: string = (this.http.request.prototype as XMLHttpRequest).getResponseHeader("kmc_user");
    }

    public getData(): Observable<BaseEnumCollectionEntity> {
        if (this.data) {
            return Observable.of(this.data);
        } else if(!this.data$) {
            this.data$ = this.http.get(this.url).share().map(d => {
                this.data = new BaseEnumCollectionEntity(d as {}[]);
                return this.data;
            });
        }
        return this.data$;
    }
    public getResources() {
        // this.http.get(this.resUrl).subscribe(d => {
        //     this.res = d;
        //     let res = Utils.FlattenObject(d);
        //     this.resFlat = res;
        // });
        let res = Utils.FlattenObject(this.res);
        this.resFlat = Object.entries(res).sort((e1, e2) => {
            let comp = e1[0].length - e2[0].length;
            return comp;
        });
    }

    /**
     * this.configService.getValue("dataTable.pageSize").subscribe(v => this.page.size = +v);
     */
    public getValue(key: string): Observable<string> {
        let value = this.getData().map(d => {
            let item = d.getByKeyFirst(key);
            return ((item != null) ? item.value : null);
            //d.getByKeyFirst(key).value;
        });
        return value;
    }


    //Doesnt work with value types (number)
    //this.configService.setValue("dataTable.pageSize", object);
    public setValue(key: string, propertyToSet) {
        this.getData().subscribe(
            d => propertyToSet = d.getByKeyFirst(key).value
        );
        //aaa
    }


    /**
     * Primarne zkusi vzit hodnotu z async data, pokud uz byla nactena.
     * Pokud nebyla, zahaji jejich nacitani a vezme config hodnotu z config lokalniho souboru
     */
    public getValueSynch(key: string): any {
        if (this.data) {
            return this.data.getByKeyFirst(key).value;
        }
        this.getData().subscribe();

        let val = (this.config as Array<{}>).find(c => c["code"] == key)["value"];
        return val;
    }

    /**
     * podle slovníku přeloží text
     */
    public translate(scope = "", text: string): string {
        this.resFlat.forEach(e => {
            let key = e[0];
            if (scope) {
                key = key.replace(scope + ".", "");
            }
            let val = e[1];
            if (key.indexOf("/") == 0) {
                //odstraneni lomitka z klice, ktere zde je vpodstate jen pro detekci reg. vyrazu
                key = new RegExp(key.replace(/\//g, ""));
            }
            text = text.replace(key, val);
        });
        return text;
    }


    /**
     * format resource msg with tags. replace tags with entity props.
     * @param resMsgOrKey ex: Uživatel [name] or msg.dataSuccess.
     * @param entity ex: {name: Karel}
     * Result: Uživatel Karel
     */
    public resFormat(resMsgOrKey: string, entity): string {
        let str = resMsgOrKey;
        if (resMsgOrKey.indexOf(".") > 0) {
            str = this.resFlat.find(e => e[0] == resMsgOrKey)[1];
        }
        let result = str.replace(/\[([a-z]+)\]/g, (match, capture) => { return entity[capture] });
        return result;
    }

    public changeLanguage(language: string) {

        let selectedLanguages = this.languages.filter(l => l.key == language);
        if ((selectedLanguages != null) && (selectedLanguages.length > 0)) {

            this.currentLanguage = selectedLanguages[0].key;
            this.currentFlag = selectedLanguages[0].flagValue;
            this.resUrl = selectedLanguages[0].urlValue;

            this.http.get(this.resUrl).subscribe(resItems => {
                this.res = resItems;
                this.res$.next(this.res);
                this.currentLanguage$.next(this.currentLanguage);
                this.currentFlag$.next(this.currentFlag);
            });
        }
    }
}
