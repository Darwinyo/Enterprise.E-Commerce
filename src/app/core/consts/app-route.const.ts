import { RouterModule, Routes } from '@angular/router';
import { ErrorNotFoundComponent } from '../pages/error-not-found/error-not-found.component';
import { CoreLayout } from './../layouts/core/core.layout';

export const appRoutes: Routes = [
    { path: 'index', redirectTo: '/home', pathMatch: 'full' },
    { path: 'admin', loadChildren: './../../+admin/admin.module#AdminModule' },
    { path: '', component: CoreLayout },
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorNotFoundComponent }
]
