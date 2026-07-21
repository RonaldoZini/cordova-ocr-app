import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { CameraOptionEnum } from "../enums/camera-option.enum";

declare var navigator: any;

@Injectable({ providedIn: 'root' })
export class CameraService {
    constructor() { }

    /**
     * Open Camera
     * @returns The URI of the captured image
     */
    open(): Observable<string> {
        return new Observable((obs) => {
            navigator.camera.getPicture((imageUri: any) => {
                obs.next(imageUri);
                obs.complete();
            }, (error: any) => {
                throw 'Error getPicture: ' + error;
            }, { quality: 100, correctOrientation: true, destinationType: CameraOptionEnum.DestinationTypeFileUri });
        });
    }
}