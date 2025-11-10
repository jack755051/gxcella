import {
  Component,
  Input,
  Output,
  EventEmitter,
  computed,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PaginationConfig,
  PageChangeEvent,
  PaginationCustomClass,
  PaginationLabels,
} from '../model/pagination.types';

@Component({
  selector: 'gx-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="customClass()?.container || 'gx-pagination'">
      <!-- Page info -->
      @if (showInfo()) {
        <div [class]="customClass()?.info || 'gx-pagination__info'">
          {{ getInfoText() }}
        </div>
      }

      <!-- Pagination navigation -->
      <nav [class]="customClass()?.nav || 'gx-pagination__nav'">
        <ul [class]="customClass()?.list || 'gx-pagination__list'">
          <!-- First page button -->
          @if (showFirstLast()) {
            <li [class]="getItemClass(1)">
              <button
                type="button"
                [class]="getLinkClass(1)"
                [disabled]="isDisabled() || currentPage() === 1"
                (click)="goToPage(1)">
                {{ labels().first || '«' }}
              </button>
            </li>
          }

          <!-- Previous button -->
          @if (showPrevNext()) {
            <li [class]="getItemClass(currentPage() - 1)">
              <button
                type="button"
                [class]="getLinkClass(currentPage() - 1)"
                [disabled]="isDisabled() || currentPage() === 1"
                (click)="goToPage(currentPage() - 1)">
                {{ labels().previous || '‹' }}
              </button>
            </li>
          }

          <!-- Page numbers -->
          @if (showPageNumbers()) {
            @for (page of visiblePages(); track page) {
              <li [class]="getItemClass(page)">
                @if (page === -1) {
                  <span [class]="customClass()?.ellipsis || 'gx-pagination__ellipsis'">
                    ...
                  </span>
                } @else {
                  <button
                    type="button"
                    [class]="getLinkClass(page)"
                    [disabled]="isDisabled()"
                    (click)="goToPage(page)">
                    {{ page }}
                  </button>
                }
              </li>
            }
          }

          <!-- Next button -->
          @if (showPrevNext()) {
            <li [class]="getItemClass(currentPage() + 1)">
              <button
                type="button"
                [class]="getLinkClass(currentPage() + 1)"
                [disabled]="isDisabled() || currentPage() === totalPages()"
                (click)="goToPage(currentPage() + 1)">
                {{ labels().next || '›' }}
              </button>
            </li>
          }

          <!-- Last page button -->
          @if (showFirstLast()) {
            <li [class]="getItemClass(totalPages())">
              <button
                type="button"
                [class]="getLinkClass(totalPages())"
                [disabled]="isDisabled() || currentPage() === totalPages()"
                (click)="goToPage(totalPages())">
                {{ labels().last || '»' }}
              </button>
            </li>
          }
        </ul>
      </nav>

      <!-- Page size selector -->
      @if (showPageSize() && pageSizeOptions().length > 0) {
        <div [class]="customClass()?.pageSize || 'gx-pagination__page-size'">
          <label>
            {{ labels().itemsPerPage || 'Items per page:' }}
            <select
              [value]="pageSize()"
              [disabled]="isDisabled()"
              (change)="onPageSizeChange($event)">
              @for (size of pageSizeOptions(); track size) {
                <option [value]="size">{{ size }}</option>
              }
            </select>
          </label>
        </div>
      }
    </div>
  `,
  styles: [`
    .gx-pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      font-family: var(--gx-pagination-font-family, system-ui, -apple-system, sans-serif);
    }

    .gx-pagination__info {
      font-size: var(--gx-pagination-info-font-size, 0.875rem);
      color: var(--gx-pagination-info-color, #6b7280);
    }

    .gx-pagination__nav {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .gx-pagination__list {
      display: flex;
      align-items: center;
      gap: var(--gx-pagination-gap, 0.25rem);
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .gx-pagination__list li {
      display: flex;
    }

    .gx-pagination__list button {
      min-width: var(--gx-pagination-button-size, 2.5rem);
      height: var(--gx-pagination-button-size, 2.5rem);
      padding: var(--gx-pagination-button-padding, 0.5rem 0.75rem);
      font-size: var(--gx-pagination-button-font-size, 0.875rem);
      font-weight: var(--gx-pagination-button-font-weight, 500);
      color: var(--gx-pagination-button-color, #374151);
      background-color: var(--gx-pagination-button-bg, transparent);
      border: 1px solid var(--gx-pagination-border-color, #d1d5db);
      border-radius: var(--gx-pagination-border-radius, 0.375rem);
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gx-pagination__list button:hover:not(:disabled) {
      background-color: var(--gx-pagination-button-hover-bg, #f3f4f6);
      border-color: var(--gx-pagination-button-hover-border, #9ca3af);
    }

    .gx-pagination__list button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .gx-pagination__list button.active {
      color: var(--gx-pagination-active-color, #ffffff);
      background-color: var(--gx-pagination-active-bg, #3b82f6);
      border-color: var(--gx-pagination-active-border, #3b82f6);
    }

    .gx-pagination__ellipsis {
      min-width: var(--gx-pagination-button-size, 2.5rem);
      height: var(--gx-pagination-button-size, 2.5rem);
      padding: var(--gx-pagination-button-padding, 0.5rem 0.75rem);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gx-pagination-ellipsis-color, #6b7280);
    }

    .gx-pagination__page-size {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: var(--gx-pagination-page-size-font-size, 0.875rem);
      color: var(--gx-pagination-page-size-color, #374151);
    }

    .gx-pagination__page-size select {
      padding: 0.375rem 0.75rem;
      font-size: var(--gx-pagination-page-size-font-size, 0.875rem);
      border: 1px solid var(--gx-pagination-border-color, #d1d5db);
      border-radius: var(--gx-pagination-border-radius, 0.375rem);
      background-color: var(--gx-pagination-select-bg, #ffffff);
      cursor: pointer;
    }

    .gx-pagination__page-size select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `],
})
export class GxPagination {
  // Inputs
  @Input() set config(value: Partial<PaginationConfig>) {
    if (value.currentPage !== undefined) this.currentPage.set(value.currentPage);
    if (value.pageSize !== undefined) this.pageSize.set(value.pageSize);
    if (value.totalItems !== undefined) this.totalItems.set(value.totalItems);
    if (value.maxVisiblePages !== undefined) this.maxVisiblePages.set(value.maxVisiblePages);
    if (value.showFirstLast !== undefined) this.showFirstLast.set(value.showFirstLast);
    if (value.showPrevNext !== undefined) this.showPrevNext.set(value.showPrevNext);
    if (value.showPageNumbers !== undefined) this.showPageNumbers.set(value.showPageNumbers);
    if (value.showPageSize !== undefined) this.showPageSize.set(value.showPageSize);
    if (value.pageSizeOptions !== undefined) this.pageSizeOptions.set(value.pageSizeOptions);
    if (value.disabled !== undefined) this.isDisabled.set(value.disabled);
  }

  @Input() set currentPageInput(value: number) {
    this.currentPage.set(value);
  }

  @Input() set pageSizeInput(value: number) {
    this.pageSize.set(value);
  }

  @Input() set totalItemsInput(value: number) {
    this.totalItems.set(value);
  }

  @Input() customClass = signal<PaginationCustomClass | undefined>(undefined);
  @Input() labels = signal<PaginationLabels>({
    first: '«',
    previous: '‹',
    next: '›',
    last: '»',
    page: 'Page',
    of: 'of',
    items: 'items',
    itemsPerPage: 'Items per page:',
  });
  @Input() showInfo = signal<boolean>(false);

  // Outputs
  @Output() pageChange = new EventEmitter<PageChangeEvent>();
  @Output() pageSizeChange = new EventEmitter<number>();

  // State
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalItems = signal<number>(0);
  maxVisiblePages = signal<number>(5);
  showFirstLast = signal<boolean>(true);
  showPrevNext = signal<boolean>(true);
  showPageNumbers = signal<boolean>(true);
  showPageSize = signal<boolean>(false);
  pageSizeOptions = signal<number[]>([10, 25, 50, 100]);
  isDisabled = signal<boolean>(false);

  // Computed
  totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.pageSize());
  });

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const max = this.maxVisiblePages();

    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(max / 2);
    let start = current - half;
    let end = current + half;

    if (start < 1) {
      start = 1;
      end = max;
    }

    if (end > total) {
      end = total;
      start = total - max + 1;
    }

    const pages: number[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push(-1); // Ellipsis
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) {
        pages.push(-1); // Ellipsis
      }
      pages.push(total);
    }

    return pages;
  });

  constructor() {
    // Emit change when page or size changes
    effect(() => {
      const current = this.currentPage();
      const size = this.pageSize();
      const total = this.totalPages();
      const items = this.totalItems();

      // Ensure current page is valid
      if (current > total && total > 0) {
        this.currentPage.set(total);
        return;
      }

      this.pageChange.emit({
        currentPage: current,
        pageSize: size,
        totalPages: total,
        totalItems: items,
      });
    });
  }

  goToPage(page: number): void {
    if (this.isDisabled()) return;

    const total = this.totalPages();
    if (page < 1 || page > total) return;
    if (page === this.currentPage()) return;

    this.currentPage.set(page);
  }

  onPageSizeChange(event: Event): void {
    if (this.isDisabled()) return;

    const select = event.target as HTMLSelectElement;
    const newSize = parseInt(select.value, 10);

    this.pageSize.set(newSize);
    this.currentPage.set(1); // Reset to first page
    this.pageSizeChange.emit(newSize);
  }

  getItemClass(page: number): string {
    const baseClass = this.customClass()?.item || 'gx-pagination__item';
    const isActive = page === this.currentPage();
    const isDisabled = page < 1 || page > this.totalPages();

    const classes = [baseClass];
    if (isActive) classes.push(this.customClass()?.active || 'active');
    if (isDisabled) classes.push(this.customClass()?.disabled || 'disabled');

    return classes.join(' ');
  }

  getLinkClass(page: number): string {
    const baseClass = this.customClass()?.link || 'gx-pagination__link';
    const isActive = page === this.currentPage();

    const classes = [baseClass];
    if (isActive) classes.push('active');

    return classes.join(' ');
  }

  getInfoText(): string {
    const start = (this.currentPage() - 1) * this.pageSize() + 1;
    const end = Math.min(this.currentPage() * this.pageSize(), this.totalItems());
    const total = this.totalItems();

    return `${start}-${end} ${this.labels().of} ${total} ${this.labels().items}`;
  }
}
