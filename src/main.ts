import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { BootController } from './boot-control';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const init = () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
};

// Init on first load
init();

// Init on reboot request
BootController.getBootControl()
  .watchReboot()
  .subscribe(() => init());
