import { ApplicationRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { FeedbackType } from '../types/feedback.type';
import { UIFeedbackComponent } from '../ui/ui-feedback/ui-feedback.component';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
    private _type: FeedbackType = 'none';

    constructor(
        private appRef: ApplicationRef,
        private envInjector: EnvironmentInjector) { }

    show(type: FeedbackType) {
        this._type = type;

        const feedbackRef = createComponent(UIFeedbackComponent, {
            environmentInjector: this.envInjector
        });

        feedbackRef.instance.type = type;

        this.appRef.attachView(feedbackRef.hostView);
        document.body.appendChild(feedbackRef.location.nativeElement as HTMLElement);

        setTimeout(() => {
            this.appRef.detachView(feedbackRef.hostView);
            feedbackRef.destroy();
            this._type = 'none';
        }, 2400);
    }

    public get type(): FeedbackType {
        return this._type;
    }
}