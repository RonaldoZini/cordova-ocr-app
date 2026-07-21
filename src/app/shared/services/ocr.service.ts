import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IOcrObject } from "../interfaces/ocr-object.interface";

declare var window: any;

/**
 * Optical Character Recognition (OCR), is a technology for recognizing characters from an image file or bitmap so that they can be scanned, handwritten, dated, or printed.
 */
@Injectable({ providedIn: 'root' })
export class OcrService {
    constructor() { }

    /**
     * Reads the image
     * @returns The recognized text
     */
    readImage(imageUri: string): Observable<IOcrObject> {
        return new Observable((obs) => {
            window.textocr.recText(0, imageUri, (ocrObject: IOcrObject) => {
                obs.next(ocrObject);
                obs.complete();
            }, (error: any) => {
                throw 'Error recText: ' + error;
            });
        })
    }
}