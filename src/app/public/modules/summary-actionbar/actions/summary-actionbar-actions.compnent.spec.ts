import {
  DebugElement
} from '@angular/core';
import {
  BrowserModule, By
} from '@angular/platform-browser';
import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  SkyMediaQueryService, SkyMediaBreakpoints
} from '@skyux/core/modules/media-query';
import {
  MockSkyMediaQueryService
} from '@skyux/core/testing';
import {
  expect
} from '@skyux-sdk/testing';

import {
  SkySummaryActionbarSecondaryActionsComponent
} from '.';
import {
  SkySummaryActionbarTestComponent
} from '../fixtures/summary-actionbar.component.fixture';
import { SkySummaryActionbarModule } from '../summary-actionbar.module';
import { SkyKeyInfoModule } from '@skyux/indicators';
import { SkySummaryActionbarComponent } from '../summary-actionbar.component';

describe('Summary Actionbar action components', () => {
  let fixture: ComponentFixture<SkySummaryActionbarTestComponent>;
  let cmp: SkySummaryActionbarTestComponent;
  let debugElement: DebugElement;
  let mockMediaQueryService: MockSkyMediaQueryService;

  beforeEach(() => {

    mockMediaQueryService = new MockSkyMediaQueryService();
    TestBed.configureTestingModule({
      declarations: [
        SkySummaryActionbarTestComponent
      ],
      imports: [
        BrowserModule,
        SkySummaryActionbarModule,
        SkyKeyInfoModule
      ]
    });

    fixture = TestBed.overrideComponent(SkySummaryActionbarSecondaryActionsComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .overrideComponent(SkySummaryActionbarComponent, {
      add: {
        providers: [
          {
            provide: SkyMediaQueryService,
            useValue: mockMediaQueryService
          }
        ]
      }
    })
    .createComponent(SkySummaryActionbarTestComponent);

    cmp = fixture.componentInstance as SkySummaryActionbarTestComponent;
    debugElement = fixture.debugElement;
  });

  it('should emit the actionClick event when the primary action button is clicked', () => {
    spyOn(cmp, 'clilckHandler').and.stub();
    fixture.detectChanges();
    debugElement.query(By.css('sky-summary-actionbar-primary-action button')).nativeElement.click();
    fixture.detectChanges();
    expect(cmp.clilckHandler).toHaveBeenCalled();
  });

  it('should emit the actionClick event when the secondary action button is clicked', () => {
    spyOn(cmp, 'clilckHandler').and.stub();
    fixture.detectChanges();
    debugElement.query(By.css('sky-summary-actionbar-secondary-action button')).nativeElement.click();
    fixture.detectChanges();
    expect(cmp.clilckHandler).toHaveBeenCalled();
  });

  it('should emit the actionClick event when the cancel button is clicked', () => {
    spyOn(cmp, 'clilckHandler').and.stub();
    fixture.detectChanges();
    debugElement.query(By.css('sky-summary-actionbar-cancel button')).nativeElement.click();
    fixture.detectChanges();
    expect(cmp.clilckHandler).toHaveBeenCalled();
  });

  it('should emit the actionClick event when the primary action button has enter pressed', () => {
    spyOn(cmp, 'clilckHandler').and.stub();
    fixture.detectChanges();
    let buttonEl = debugElement.query(By.css('sky-summary-actionbar-primary-action button')).nativeElement;
    const event = new KeyboardEvent('keydown', {
        'key': 'Enter'
    });
    buttonEl.dispatchEvent(event); fixture.detectChanges();
    expect(cmp.clilckHandler).toHaveBeenCalled();
  });

  it('should emit the actionClick event when the secondary action button has enter pressed', () => {
    spyOn(cmp, 'clilckHandler').and.stub();
    fixture.detectChanges();
    let buttonEl = debugElement.query(By.css('sky-summary-actionbar-secondary-action button')).nativeElement;
    const event = new KeyboardEvent('keydown', {
        'key': 'Enter'
    });
    buttonEl.dispatchEvent(event);
    fixture.detectChanges();
    expect(cmp.clilckHandler).toHaveBeenCalled();
  });

  it('should emit the actionClick event when the cancel button has enter pressed', () => {
    spyOn(cmp, 'clilckHandler').and.stub();
    fixture.detectChanges();
    let buttonEl = debugElement.query(By.css('sky-summary-actionbar-cancel button')).nativeElement;
    const event = new KeyboardEvent('keydown', {
        'key': 'Enter'
    });
    buttonEl.dispatchEvent(event); fixture.detectChanges();
    expect(cmp.clilckHandler).toHaveBeenCalled();
  });

  it('should disable the element when the primary action button has isDisabled set to true', () => {
    cmp.disableButtons = true;
    fixture.detectChanges();
    expect(debugElement.query(By.css('sky-summary-actionbar-primary-action button'))
      .nativeElement.disabled).toBeTruthy();
  });

  it('should disable the element when the secondary action button has isDisabled set to true', () => {
    cmp.disableButtons = true;
    fixture.detectChanges();
    expect(debugElement.query(By.css('sky-summary-actionbar-secondary-action button'))
      .nativeElement.disabled).toBeTruthy();
  });

  it('should disable the element when the cancel button has isDisabled set to true', () => {
    cmp.disableButtons = true;
    fixture.detectChanges();
    expect(debugElement.query(By.css('sky-summary-actionbar-cancel button'))
      .nativeElement.disabled).toBeTruthy();
  });

  it('should have secondary actions with isDropdown as false on large screens', () => {
    fixture.detectChanges();
    cmp.secondaryActions.actions.forEach(action => {
      expect(action.isDropdown).toBeFalsy();
    });
  });

  it('should have secondary actions with isDropdown as false on large screens when there are five actions', () => {
    fixture.detectChanges();
    cmp.secondaryActions.actions.forEach(action => {
      expect(action.isDropdown).toBeFalsy();
    });
    fixture.detectChanges();
    cmp.extraActions = true;
    fixture.detectChanges();
    cmp.secondaryActions.actions.forEach(action => {
      expect(action.isDropdown).toBeTruthy();
    });
  });

  it('should have secondary actions with isDropdown as true on xs screens', () => {
    mockMediaQueryService.fire(SkyMediaBreakpoints.xs);
    fixture.detectChanges();
    cmp.secondaryActions.actions.forEach(action => {
      expect(action.isDropdown).toBeTruthy();
    });
  });

});
