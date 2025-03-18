import { AfterViewInit, Component } from '@angular/core';
import { generateNameSteps } from './intro';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const nameSteps = generateNameSteps();
    const writer = document.getElementById("writer");
    if (!writer) return;

    const writeText = (i: number) => {
      const obj = nameSteps[i++];
      if (obj)
        writer!.innerHTML = obj.text;

      if (i <= nameSteps.length)
        setTimeout(() => writeText(i), obj.time);

      else {
        localStorage.setItem('introSeen', 'true');

        writer.classList.remove('top-1/2', 'text-7xl');
        writer.classList.add('top-10', 'text-5xl');
      }
    }

    writeText(0);
  }
}
