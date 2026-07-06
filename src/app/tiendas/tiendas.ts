import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tienda } from '../shared/interface/tienda.interface';

@Component({
  selector: 'app-tiendas',
  imports: [],
  templateUrl: './tiendas.html',
  styleUrls: ['./tiendas.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tiendas {

  @Input() tienda: Tienda | undefined;

}
