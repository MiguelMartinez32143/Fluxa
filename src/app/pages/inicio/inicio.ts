import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements AfterViewInit, OnDestroy {


  activeModal: 'login' | 'signup' | 'forgot' | null = null;

  /* Login */
  loginEmail = '';
  loginPassword = '';
  showLoginPass = false;

  /* Signup */
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  signupConfirm = '';
  showSignupPass = false;
  acceptTerms = false;

  /* Forgot */
  forgotEmail = '';

  private observer: IntersectionObserver | null = null;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /* ----- Password ----- */
  get passwordStrength(): number {
    const p = this.signupPassword;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score += 20;
    if (p.length >= 10) score += 15;
    if (/[A-Z]/.test(p)) score += 20;
    if (/[0-9]/.test(p)) score += 20;
    if (/[^A-Za-z0-9]/.test(p)) score += 25;
    return Math.min(score, 100);
  }

  /* ----- Modal ----- */
  openModal(type: 'login' | 'signup' | 'forgot') {
    this.activeModal = type;
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }
  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.activeModal = null;
      if (this.isBrowser) {
        document.body.style.overflow = '';
      }
    }
  }
  switchModal(type: 'login' | 'signup' | 'forgot') {
    this.activeModal = type;
  }

  handleLogin(): void {
    if (this.loginEmail && this.loginPassword) {
      this.activeModal = null;
      if (this.isBrowser) {
        document.body.style.overflow = '';
      }
    }
  }

  /* ----- Lifecycle ----- */
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Scroll animacion
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const items = this.el.nativeElement.querySelectorAll('.reveal-item');
    items.forEach((item: Element) => this.observer!.observe(item));

    // Counter animacion
    const counters =
      this.el.nativeElement.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c: Element) => counterObserver.observe(c));

    // Scroll para enlaces
    this.el.nativeElement
      .querySelectorAll('a[href^="#"]')
      .forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const id = link.getAttribute('href')?.slice(1);
          if (id) {
            document.getElementById(id)?.scrollIntoView({
              behavior: 'smooth',
            });
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  /* ----- Counter Animacion----- */
  private animateCounter(el: HTMLElement): void {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    if (!target) return;

    const duration = 1800;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);

      if (target >= 1000000) {
        // Format as $X.XM
        el.textContent = (current / 1000000).toFixed(1) + 'M+';
      } else {
        el.textContent = current.toLocaleString('en-US') + '+';
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
