import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  OnChanges,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Creation } from '../../interfaces/creation/creation.interfaces';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

const breakpoints = [
  '(max-width: 576px)',
  '(max-width: 768px)',
  '(max-width: 992px)',
  '(max-width: 1200px)',
] as const;

type BreakPoint = (typeof breakpoints)[number];

type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

@Component({
  selector: 'shiny-stone-galerie',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './galerie.component.html',
  styleUrl: './galerie.component.scss',
})
export class GalerieComponent implements OnChanges {
  private breakpointObserver = inject(BreakpointObserver);

  @Input()
  public galeries: Creation[] = [];

  protected order: WritableSignal<'ASC' | 'DESC'> = signal('ASC');

  protected page: WritableSignal<number> = signal(0);

  protected size: WritableSignal<Size> = signal('m');

  protected creations: Signal<Creation[]> = computed(() => []);

  private readonly breakPointToSize: { [key: string]: Size } = {
    '(max-width: 576px)': 'xs',
    '(max-width: 768px)': 's',
    '(max-width: 992px)': 'm',
    '(max-width: 1200px)': 'l',
  };

  public readonly sizeToNumber: { [key: string]: number } = {
    xs: 2,
    s: 2,
    m: 4,
    l: 6,
    xl: 6,
  };

  ngOnChanges(): void {
    if (this.galeries.length > 0) {
      this.breakpointObserver
        .observe(breakpoints)
        .subscribe((result: BreakpointState) => {
          if (!result.matches) {
            this.size.set('xl');
            return;
          }
          for (let index = 0; index < 4; index++) {
            if (result.breakpoints[breakpoints[index]]) {
              this.size.set(this.breakPointToSize[breakpoints[index]]);
              break;
            }
          }
          this.page.set(0);
        });

      this.creations = computed(() => {
        const order = this.order();
        const page = this.page();
        const size = this.size();
        return this.galeries
          .sort((a, b) => {
            return order === 'ASC'
              ? new Date(a.date).getTime() - new Date(b.date).getTime()
              : new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .slice(
            page * this.sizeToNumber[size],
            (page + 1) * this.sizeToNumber[size]
          );
      });
    }
  }

  buttonPageClick(add: number): void {
    this.page.update((p) => {
      const size = this.sizeToNumber[this.size()];
      if (p + add < 0) {
        return Math.ceil(this.galeries.length / size) - 1;
      }
      return (p + add) % Math.ceil(this.galeries.length / size);
    });
  }

  protected setPage(e: PageEvent): void {
    this.page.set(e.pageIndex);
  }
}
