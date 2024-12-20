import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'personal-site';

  scrollToSection(e: MouseEvent, id: string): void {
    const section = document.getElementById(id);
    e.preventDefault();

    if (section)
      section.scrollIntoView({ behavior: 'smooth' });
  }

  currentSection: string = ''
  @ViewChildren('section') sections!: QueryList<ElementRef>
  private observer!: IntersectionObserver

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.4,
		};

		this.observer = new IntersectionObserver((entries) => {
      this.ngZone.run(() =>
        this.currentSection = entries
          .find(entry => entry.isIntersecting)!
          .target
          .getAttribute("aria-labelledby") as string
      )
		}, observerOptions);

		for (const section of this.sections)
			this.observer.observe(section.nativeElement);
  }

  ngOnDestroy(): void {
    for (const section of this.sections)
      this.observer.unobserve(section.nativeElement);
  }
}
