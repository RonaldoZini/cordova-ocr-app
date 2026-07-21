import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { BankTicketService } from '../shared/services/bank-ticket.service';
import { CameraService } from '../shared/services/camera.service';
import { OcrService } from '../shared/services/ocr.service';
import { UIFeedbackModule } from '../shared/ui/ui-feedback/ui-feedback.module';
import { HomePageRoutingModule } from './home-routing.module';
import { FeedbackService } from '../shared/services/feedback.service';
import { FileReaderService } from '../shared/services/file-reader.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    UIFeedbackModule,
  ],
  providers: [
    CameraService,
    OcrService,
    BankTicketService,
    FeedbackService,
    FileReaderService,
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
