import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { SitePublicFooterComponent } from '../../../../core/layout/site-public-footer/site-public-footer';
import { SitePublicHeaderComponent } from '../../../../core/layout/site-public-header/site-public-header';
import { getBusinessBySlug } from '../../data/business-directory.data';

@Component({
  selector: 'app-business-detail',
  imports: [SitePublicHeaderComponent, SitePublicFooterComponent],
  templateUrl: './business-detail.html',
  styleUrl: './business-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessDetailComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly paramMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly business = computed(() => getBusinessBySlug(this.paramMap().get('slug')));

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      queueMicrotask(() => {
        const jquery = (window as typeof window & { jQuery?: any }).jQuery;

        if (!jquery) {
          return;
        }

        const navbar = jquery('.navbar');

        if (navbar.length && typeof navbar.sticky === 'function') {
          if (navbar.parent().hasClass('sticky-wrapper')) {
            navbar.unwrap();
            navbar.removeAttr('style');
          }

          navbar.sticky({ topSpacing: 0 });
        }

        jquery('.navbar-collapse a').off('click.barista').on('click.barista', () => {
          jquery('.navbar-collapse').collapse('hide');
        });
      });
    }
  }
}