import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  protected readonly metrics = [
    { value: '3x', label: 'más claridad en la navegación' },
    { value: '100%', label: 'estructura escalable con Angular' },
    { value: '24/7', label: 'base lista para crecer con tu negocio' },
  ];

  protected readonly services = [
    {
      title: 'Arquitectura modular',
      description: 'Separación clara entre `core`, `shared` y `features` para mantener el proyecto limpio y mantenible.',
    },
    {
      title: 'Diseño visual moderno',
      description: 'Secciones listas para presentar valor, servicios, proceso y llamados a la acción con un estilo corporativo.',
    },
    {
      title: 'Preparado para escalar',
      description: 'La base permite integrar formularios, APIs, autenticación, blog, catálogo o panel administrativo después.',
    },
  ];

  protected readonly steps = [
    {
      step: '01',
      title: 'Presentar la propuesta',
      description: 'Una primera pantalla sólida para explicar qué hace la marca y captar atención desde el inicio.',
    },
    {
      step: '02',
      title: 'Guiar al usuario',
      description: 'Bloques de contenido con jerarquía visual para mejorar lectura, confianza y conversión.',
    },
    {
      step: '03',
      title: 'Convertir visitas',
      description: 'Sección final con CTA clara para que el visitante solicite contacto, cotización o demo.',
    },
  ];
}
