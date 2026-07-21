import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { catchError, EMPTY, map, mergeMap, tap } from 'rxjs';
import { IOcrObject } from '../shared/interfaces/ocr-object.interface';
import { BankTicketService } from '../shared/services/bank-ticket.service';
import { CameraService } from '../shared/services/camera.service';
import { FeedbackService } from '../shared/services/feedback.service';
import { FileReaderService } from '../shared/services/file-reader.service';
import { OcrService } from '../shared/services/ocr.service';
import { FeedbackType } from '../shared/types/feedback.type';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  feedback: FeedbackType = 'none';
  digitalLine!: string;
  ticketUrl!: string;

  constructor(
    private cameraService: CameraService,
    private ocrService: OcrService,
    private bankTicketService: BankTicketService,
    private feedbackService: FeedbackService,
    private fileReaderService: FileReaderService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) { }

  capture(): void {
    this.ngZone.run(() => {
      let ticketUri: string;

      this.clearVariables()

      this.cameraService.open().pipe(
        mergeMap((imageUri) => {
          ticketUri = imageUri;
          return this.ocrService.readImage(imageUri);
        }),
        map((ocrObject: IOcrObject) => this.bankTicketService.findOcrAndReturnDigitalLine(ocrObject)),
        tap((digitalLine) => {
          if (!digitalLine) throw 'Digital line not found'

          this.digitalLine = digitalLine;
          this.feedback = 'success';
          this.cdr.detectChanges();
        }),
        catchError(error => {
          console.log(error);
          this.feedback = 'error';
          return EMPTY;
        })
      ).subscribe().add(() => {
        this.feedbackService.show(this.feedback);
        this.cdr.detectChanges();

        this.fileReaderService.uriToBlob(ticketUri).pipe(
          tap((blob) => {
            this.ticketUrl = this.fileReaderService.blobToUrl(blob);
            this.cdr.detectChanges();
          })
        ).subscribe();
      });
    })
  }

  private clearVariables(): void {
    this.feedback = 'none';
    if (this.ticketUrl) this.fileReaderService.cleanUrlOfMemory(this.ticketUrl);
    this.ticketUrl = '';
    this.digitalLine = '';
  }
}
