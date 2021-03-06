import { RouterModule, Routes } from '@angular/router';
import { PeriodeEditorComponent } from './../pages/periode-editor/periode-editor.component';
import { ProductEditorComponent } from './../pages/product-editor/product-editor.component';

export const adminRoutes: Routes = [
    { path: 'admin', redirectTo: '/periode-editor', pathMatch: 'full' },
    { path: 'product-editor', component: ProductEditorComponent, pathMatch: 'full' },
    { path: 'periode-editor', component: PeriodeEditorComponent, pathMatch: 'full' }
]
