"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = require("../code/guid");
var Notification = /** @class */ (function () {
    function Notification() {
    }
    return Notification;
}());
exports.Notification = Notification;
var NotificationDisplayType;
(function (NotificationDisplayType) {
    NotificationDisplayType[NotificationDisplayType["Message"] = 1] = "Message";
    NotificationDisplayType[NotificationDisplayType["Alert"] = 2] = "Alert";
    NotificationDisplayType[NotificationDisplayType["MessageWithAlert"] = 3] = "MessageWithAlert";
})(NotificationDisplayType = exports.NotificationDisplayType || (exports.NotificationDisplayType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["Common"] = 0] = "Common";
    NotificationType[NotificationType["WorkItem"] = 1] = "WorkItem";
    NotificationType[NotificationType["Export"] = 2] = "Export";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var NotificationLevel;
(function (NotificationLevel) {
    NotificationLevel[NotificationLevel["Success"] = 0] = "Success";
    NotificationLevel[NotificationLevel["Info"] = 1] = "Info";
    NotificationLevel[NotificationLevel["Warning"] = 2] = "Warning";
    NotificationLevel[NotificationLevel["Error"] = 3] = "Error";
})(NotificationLevel = exports.NotificationLevel || (exports.NotificationLevel = {}));
var NotificationEntity = /** @class */ (function () {
    function NotificationEntity(title, message) {
        /**duration in milisec. 0-infinit, 5sec - default */
        this.duration = NotificationEntity.defaultDuration;
        this.notificationType = NotificationType.Common;
        this.displayType = NotificationDisplayType.Message;
        this.notificationLevel = NotificationLevel.Info;
        this.enableDeletionFlag = true;
        this.title = title;
        this.message = message;
        //TODO: bude ze serveru generovane
        this.uuid = guid_1.Guid.NewGuid().toString();
    }
    NotificationEntity.createRandom = function (seed) {
        var random = new NotificationEntity("testovací notif " + seed, "Lorem ipsum dolor sit amet consectetuer congue rhoncus tempor nunc pretium. Turpis adipiscing tincidunt montes Sed enim sem mollis quis id Phasellus. Tellus et senectus Curabitur a Nulla magna congue ut leo wisi. ");
        random.notificationType = Math.floor(Math.random() * Object.keys(NotificationType).length / 2);
        random.displayType = Math.floor(Math.random() * Object.keys(NotificationDisplayType).length / 2);
        random.notificationLevel = Math.floor(Math.random() * Object.keys(NotificationLevel).length / 2);
        random.enableDeletionFlag = Math.random() > 0.5;
        return random;
    };
    NotificationEntity.defaultDuration = 5;
    return NotificationEntity;
}());
exports.NotificationEntity = NotificationEntity;
var NotificationEntityCollection = /** @class */ (function (_super) {
    __extends(NotificationEntityCollection, _super);
    //private messages: NotificationEntity[];
    function NotificationEntityCollection() {
        return _super.call(this) || this;
    }
    return NotificationEntityCollection;
}(Array));
exports.NotificationEntityCollection = NotificationEntityCollection;
//# sourceMappingURL=notification.entity.js.map