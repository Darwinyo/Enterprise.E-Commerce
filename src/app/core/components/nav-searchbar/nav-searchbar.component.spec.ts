import { CovalentSearchModule } from '@covalent/core';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavSearchbarComponent } from './nav-searchbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('[AUTH] [COMPONENT] NAV-SEARCH-BAR-COMPONENT', () => {
    let component: NavSearchbarComponent;
    let fixture: ComponentFixture<NavSearchbarComponent>;
    let searchTxt: HTMLInputElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavSearchbarComponent],
            imports: [NoopAnimationsModule, CovalentSearchModule]
        });
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(NavSearchbarComponent);
        component = fixture.componentInstance;
        searchTxt = fixture.debugElement.query(By.css('input')).nativeElement;
        spyOn(component.searchEvent, 'emit');
        fixture.detectChanges();
    }));
    afterEach(async(() => {
        component = null;
        fixture = null;
        searchTxt = null;
    }));
    describe('Functionality Tests', () => {
        it('should debounce emit on search event', fakeAsync(() => {
            searchTxt.value = 't';
            searchTxt.dispatchEvent(new Event('input'));
            tick(999);
            expect(component.searchEvent.emit).not.toHaveBeenCalledWith(component.searchInputTerm);
            searchTxt.value = 'test';
            searchTxt.dispatchEvent(new Event('input'));
            tick(999);
            expect(component.searchEvent.emit).not.toHaveBeenCalledWith(component.searchInputTerm);
            tick(1);
            expect(component.searchEvent.emit).toHaveBeenCalledWith(component.searchInputTerm);
        }));
    });
});
