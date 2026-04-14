import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  private readonly document = inject(DOCUMENT);

  private readonly scripts = [
    'js/vendor/jquery-3.2.1.min.js',
    'js/bootstrap.min.js',
    'js/jquery.slicknav.min.js',
    'js/owl.carousel.min.js',
    'js/jquery.nice-select.min.js',
    'js/jquery-ui.min.js',
    'js/jquery.magnific-popup.min.js',
    'js/main.js',
  ];

  async ngAfterViewInit(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.document.defaultView?.requestAnimationFrame?.(() => resolve()) ?? resolve();
    });

    for (const script of this.scripts) {
      await this.loadScript(script);
    }
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const selector = `script[data-template-src="${src}"]`;
      const existingScript = this.document.querySelector(selector) as HTMLScriptElement | null;

      if (existingScript?.dataset['loaded'] === 'true') {
        resolve();
        return;
      }

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(new Error(`No se pudo cargar ${src}`)), {
          once: true,
        });
        return;
      }

      const script = this.document.createElement('script');
      script.src = src;
      script.async = false;
      script.dataset['templateSrc'] = src;
      script.dataset['loaded'] = 'false';

      script.addEventListener(
        'load',
        () => {
          script.dataset['loaded'] = 'true';
          resolve();
        },
        { once: true },
      );

      script.addEventListener('error', () => reject(new Error(`No se pudo cargar ${src}`)), { once: true });

      this.document.body.appendChild(script);
    });
  }
}
