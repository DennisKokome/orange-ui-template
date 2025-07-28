import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

export function provideInMemoryWebApiConfig(): EnvironmentProviders {
  return makeEnvironmentProviders([
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      delay: 500
    }).providers!
  ]);
}
