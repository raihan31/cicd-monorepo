import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads and displays products from the API', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.loading()).toBe(true);
    expect(component.products()).toEqual([]);
    expect(component.error()).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Loading products...');

    const request = httpTestingController.expectOne('/api/products');
    expect(request.request.method).toBe('GET');
    request.flush({
      products: [
        { id: 1, name: 'Laptop', price: 1200 },
        { id: 2, name: 'Keyboard', price: 100 },
      ],
    });
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.products()).toHaveLength(2);
    expect(component.error()).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Laptop');
    expect(fixture.nativeElement.textContent).toContain('$1,200.00');
    expect(fixture.nativeElement.textContent).toContain('Keyboard');
    expect(fixture.nativeElement.textContent).toContain('$100.00');
  });

  it('shows an error when the API request fails', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    httpTestingController
      .expectOne('/api/products')
      .flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    fixture.detectChanges();

    const expectedMessage =
      'Products could not be loaded. Is the NestJS API running?';
    expect(component.loading()).toBe(false);
    expect(component.products()).toEqual([]);
    expect(component.error()).toBe(expectedMessage);
    expect(fixture.nativeElement.textContent).toContain(expectedMessage);
  });
});
