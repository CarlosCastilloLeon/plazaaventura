import { AfterViewInit, Component, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ImportantFactItem {
  icon: string;
  value: number;
  label: string;
  delay: string;
}
@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss'],
  imports: [CommonModule]
})
export class FactsComponent implements AfterViewInit {
  
  @Input() title = 'Important Facts';

  @Input() facts: ImportantFactItem[] = [
    {
      icon: 'fa fa-smile',
      value: 999,
      label: 'Clientes Felices',
      delay: '0.3s'
    },
    {
      icon: 'fa fa-cart-shopping',
      value: 42,
      label: 'Servicios',
      delay: '0.5s'
    },
    {
      icon: 'fa fa-users',
      value: 1250,
      label: 'Visitas Diarias',
      delay: '0.7s'
    },
    {
      icon: 'fa fa-car',
      value: 250,
      label: 'Lugares Estacionamiento',
      delay: '0.7s'
    }
  ];

  aAnimated: boolean = false;
  bAnimated: boolean = false;
  cAnimated: boolean = false;
  dAnimated: boolean = false;
  // Accessing DOM elements with ViewChild
  @ViewChild('a') a: any;
  @ViewChild('b') b: any;
  @ViewChild('c') c: any;
  @ViewChild('d') d: any;

  currentValues: number[] = [];
  constructor(private render: Renderer2) {}
  ngAfterViewInit(): void {

    // Create a scrolling event using Renderer2
    this.render.listen('window', 'scroll', () => {

      // Get element a position
      let aPosition = this.a.nativeElement.getBoundingClientRect();

      // Compare it with the height of the window
      if (aPosition.top >= 0 && aPosition.bottom <= window.innerHeight) {
        // if it has not been animated  yet, animate a
        if (this.aAnimated == false) {
          this.animateValue(this.a, 0, this.facts[0].value, 1000);

          // prevent animation from running again
          this.aAnimated = true;
        }
      }

      // Get element b position
      let bPosition = this.b.nativeElement.getBoundingClientRect();

      // Compare it with the height of the window
      if (bPosition.top >= 0 && bPosition.bottom <= window.innerHeight) {
        // if it has not been animated  yet, animate b
        if (this.bAnimated == false) {
          this.animateValue(this.b, 0, this.facts[1].value, 1000);

          // prevent animation from running again
          this.bAnimated = true;
        }
      }

      // Get element c position
      let cPosition = this.c.nativeElement.getBoundingClientRect();

      // Compare it with the height of the window
      if (cPosition.top >= 0 && cPosition.bottom <= window.innerHeight) {
        // if it has not been animated  yet, animate c
        if (this.cAnimated == false) {
          this.animateValue(this.c, 0, this.facts[2].value, 1000);

          // prevent animation from running again
          this.cAnimated = true;
        }
      }

      // Get element d position
      let dPosition = this.d.nativeElement.getBoundingClientRect();

      // Compare it with the height of the window
      if (dPosition.top >= 0 && dPosition.bottom <= window.innerHeight) {
        // if it has not been animated  yet, animate d
        if (this.dAnimated == false) {
          this.animateValue(this.d, 0, this.facts[3].value, 1000);

          // prevent animation from running again
          this.dAnimated = true;
        }
      }

    
    });
  }

  // Counter animation fucntion
  animateValue(obj: any, start: number, end: number, duration: number) {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      //  Set the actual time
      if (!startTimestamp) startTimestamp = timestamp;
      // Calculate progress (the time versus the set duration)
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Calculate the value compared to the progress and set the value in the HTML
      obj.nativeElement.innerHTML = Math.floor(
        progress * (end - start) + start
      );
      // If progress is not 100%, an call a new animation of step
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    // Call a last animation of step
    window.requestAnimationFrame(step);
  }



}
