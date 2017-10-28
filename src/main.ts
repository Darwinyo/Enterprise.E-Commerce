import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
// AOT COMPILATION
// import { AppModuleNgFactory } from './app/app.module.ngfactory';

// JIT COMPILATION
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// AOT COMPILATION
// platformBrowserDynamic().bootstrapModule(AppModuleNgFactory)
//   .catch(err => console.log(err));

// JIT COMPILATION
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
