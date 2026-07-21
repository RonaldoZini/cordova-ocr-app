
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { File } from '@awesome-cordova-plugins/file/ngx';

declare var window: any;
declare var cordova: any;

@Injectable({ providedIn: 'root' })
export class FileReaderService {
    constructor(private file: File) { }

    /**
     * Convert URI to Blob
     */
    uriToBlob(uri: string): Observable<Blob> {
        return new Observable((obs) => {
            this.file.resolveLocalFilesystemUrl(uri)
                .then((fileEntry: any) => {
                    fileEntry.file((file: any) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            if (!reader.result) return obs.error('FileReader result is null');
                            const blob = new Blob([reader.result], { type: file.type });
                            obs.next(blob);
                            obs.complete();
                        };
                        reader.onerror = err => obs.error(err);
                        reader.readAsArrayBuffer(file);
                    }, (err: any) => obs.error(err));
                })
                .catch((err: any) => obs.error(err));
        });
    }

    /**
     * Convert Blob to URL
     */
    blobToUrl(blob: Blob) {
        return URL.createObjectURL(blob);
    }

    /**
     * Performs URL cleaning so that it is not allocated in memory
     */
    cleanUrlOfMemory(url: string) {
        URL.revokeObjectURL(url);
    }

    
}



