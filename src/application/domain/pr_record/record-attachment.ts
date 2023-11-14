export class RecordAttachment {
    attachmentUrl: string;
    prRecordId: string;

    constructor(attachmentUrl: string, prRecordId: string) {
        this.attachmentUrl = attachmentUrl;
        this.prRecordId = prRecordId;
    }
}
