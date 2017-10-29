import { CartViewModel } from './../../viewmodels/cart/cart.viewmodel';
import { cartList } from './../../../shared/mock-data/cart-list';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatListModule } from '@angular/material';
import { CartComponent } from './cart.component';

describe('[CORE] [COMPONENT] CART-COMPONENT', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let componentEl: HTMLElement;
    let cartViewModel: CartViewModel[];
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartComponent],
            imports: [
                MatListModule
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        componentEl = fixture.debugElement.query(By.css('#cart-container')).nativeElement;
        cartViewModel = cartList;
        fixture.detectChanges();
    });
    afterEach(() => {
        component = null;
        fixture = null;
        componentEl = null;
        cartViewModel = null;
    });
    describe('UI Tests', () => {
        it('should display Empty Cart When cart list empty', async(() => {
            fixture.whenStable().then(() => {
                expect(componentEl.innerHTML).toContain('Empty Cart');
            });
        }));
        it('should display Product Lists When cart list not empty', async(() => {
            component.cartList = cartViewModel;
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(componentEl.innerHTML).toContain(cartViewModel[0].productName);
            });
        }));
    });
    describe('Functionality Tests', () => {
        it('should emit review event when product clicked', async(() => {
            component.cartList = cartViewModel;
            spyOn(component.reviewEvent, 'emit');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                (<HTMLAnchorElement>componentEl.children[0].children[0]).click();
                expect(component.reviewEvent.emit).toHaveBeenCalledWith(cartViewModel[0].productId);
            });
        }));
    });
});
