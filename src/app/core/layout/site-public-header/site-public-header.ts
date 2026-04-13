import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-public-header',
  imports: [RouterLink],
  templateUrl: './site-public-header.html',
  styleUrl: './site-public-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SitePublicHeaderComponent {
  readonly homeMode = input(false);
  readonly ctaLabel = input('Locales');
  readonly ctaRoute = input('/reservation');
}