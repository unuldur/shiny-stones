import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  model,
  OnChanges,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { Pierre } from '../../interfaces/pierre.interface';
import { ModalPierreComponent } from '../modal-pierre/modal-pierre.component';

const breakpoints = [
  '(max-width: 576px)',
  '(max-width: 768px)',
  '(max-width: 992px)',
  '(max-width: 1200px)',
] as const;

type BreakPoint = (typeof breakpoints)[number];

type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

@Component({
  selector: 'shiny-stone-galerie-pierre',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  templateUrl: './galerie-pierre.component.html',
  styleUrl: './galerie-pierre.component.scss',
})
export class GaleriePierreComponent implements OnChanges {
  private breakpointObserver = inject(BreakpointObserver);
  readonly dialog = inject(MatDialog);

  @Input()
  public galeries: Pierre[] = [];

  protected order: WritableSignal<'ASC' | 'DESC'> = model('ASC');

  protected page: WritableSignal<number> = model(0);

  protected recherche: WritableSignal<string> = model('');

  protected size: WritableSignal<Size> = model('m');

  protected lenght: Signal<number> = computed(() => 0);

  protected creations: Signal<Pierre[]> = computed(() => []);

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
        const recherche = this.recherche();
        return this.galeries
          .sort((a, b) => {
            return order === 'ASC'
              ? a.nom.localeCompare(b.nom)
              : b.nom.localeCompare(a.nom);
          })
          .filter((pierre) =>
            pierre.nom.toLowerCase().includes(recherche.toLowerCase())
          )
          .slice(
            page * this.sizeToNumber[size],
            (page + 1) * this.sizeToNumber[size]
          );
      });

      this.lenght = computed(() => {
        const recherche = this.recherche();
        return this.galeries.filter((pierre) =>
          pierre.nom.toLowerCase().includes(recherche.toLowerCase())
        ).length;
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

  protected rechercher(recherche: string): void {
    this.page.set(0);
    this.recherche.set(recherche);
  }

  protected openModal(pierre: Pierre): void {
    this.dialog.open(ModalPierreComponent, {
      data: pierre,
    });
  }
}
