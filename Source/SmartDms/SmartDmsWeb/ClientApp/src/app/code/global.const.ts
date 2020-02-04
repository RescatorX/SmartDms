export class Consts {

    public static appTitle = "OneDMS";

    public static requestHeader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        kmc_user: "kmcAdmin",
        kmc_event_source: "1",
        kmc_system: "Chromium",
        kmc_language: "cs-CZ",
        kmc_translation_context: "ALL",
        kmc_integration_system: "ONEDMS_KMWEB",
        kmc_event_control_id: "TODO: doimplementovat pro tento konretni typ requestu",
    };
    public static responseHeaders = {
        user: "kmc_user"
    }
    public static separator: string = ";";

    public static dateFormat = "dd. mm. yyyy";
    // public static dateTimeFormat_toHybernateQuery = 'YYYY-MM-DD"T"HH24:MI:SS"Z"';
    //pouzite pro distinct
    public static dateTimeFormat_toHybernateQuery = 'YYYY-MM-DD'; //aby se stejne datumy s rozdilnym case zobrazovaly stejne
    public static datetimeFormat_momnet_toHybernateQuery = "YYYY-MM-DD";
    public static datetimeFormat_moment = "DD. MM. YYYY";
    public static dateFormatPipe = "d. M. yyyy";
    public static datetimeFormatPipe = "d. M. yyyy hh:mm:ss";
    
}