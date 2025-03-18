import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements AfterViewInit {
  private nameSteps: { text: string; time: number }[] = [];

  constructor(
    private router: Router
  ) {}

  private generateNameSteps(): void {
    const fast = 100;
    const slow = 300;
    const name = "Brendan Smith";
    const blinkingArr = [
      { text: ' ', time: slow },
      { text: '_', time: slow },
      { text: ' ', time: slow },
      { text: '_', time: slow }
    ];

    // Adds initial blinking
    this.nameSteps.push(...blinkingArr);

    // Adds name typing
    for (let i = 1; i <= name.length; ++i)
      this.nameSteps.push({ text: name.substring(0, i) + '_', time: fast });

    // Adds blinking after the name
    this.nameSteps.push(...blinkingArr.map(item => ({
      text: name + item.text,
      time: item.time
    })));

    // Adds final name
    this.nameSteps.push({ text: name, time: 500 });
  }

  ngAfterViewInit(): void {
    this.generateNameSteps();
    const writer = document.getElementById("writer");
    if (!writer) return;

    let i: number = 0;
    const writeText = () => {
      const obj = this.nameSteps[i++];
      writer!.innerHTML = obj.text;

      if (i < this.nameSteps.length)
        setTimeout(writeText, obj.time);

      else
        this.router.navigate(['home'])
    }

    writeText();
  }
}
