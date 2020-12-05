import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  
  constructor() { }

  ngOnInit() {
  }
  
  next(): void {
    this.slides.slideNext();
  }

  skip():void {
    this.slides.slideTo(3);
  }

}
