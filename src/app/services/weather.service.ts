import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap, map } from 'rxjs/operators';
import { of, forkJoin, Observable, zip } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GeoLocationApi } from '../features/models/geoLocation.model';
import { CurrentCondition } from '../features/models/current-condition.model';
import { Forecast } from '../features/models/forecast.model';
import { AutoComplete } from '../features/models/autocomplete.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  geo = navigator.geolocation;
  geoLocationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?';
  currentConditionUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
  forecastUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  autocompleteLocationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?';
  constructor(private http: HttpClient) { }

  getCityKeyFromGeolocationApi(latitude: number, longitude: number): Observable<GeoLocationApi> {
    return this.http.get<GeoLocationApi>(
      `${this.geoLocationUrl}apikey=${environment.apiKeyAccuW}&q=${latitude},${longitude}
    `);
  }

  getCityKEyFromAutoCompleteApi(searchTerm: string): Observable<AutoComplete> {
    return this.http.get<AutoComplete>(`
    ${this.autocompleteLocationUrl}apikey=${environment.apiKeyAccuW}&q=${searchTerm}
    `);
  }

  getGeoLocalPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, () => {
        alert('cannot get location');
        reject();
      });
    });
  }

  getCurrentConditionAndForecastForLocationKey(locationKey: string) {
    return zip(
      this.getCurrentCondition(locationKey),
      this.getForecast(locationKey)
    ).pipe(
      map(([currentConditions, forecast]) => {
        return {
          currentConditions,
          forecast
        };
      })
    );
  }

  private getCurrentCondition(cityName: string): Observable<CurrentCondition> {
    return this.http.get<CurrentCondition>(
      `${this.currentConditionUrl}${cityName}?apikey=${environment.apiKeyAccuW}`
    );
  }

  private getForecast(locationKey: string): Observable<Forecast> {
    return this.http.get<Forecast>(
      `${this.forecastUrl}/${locationKey}?apikey=${environment.apiKeyAccuW}`
    );
  }

}
// getCurrentWeatherDataFromSearchMock() {
//   return this.getCityKeyFromAutoComplete('')
//   .pipe(
//     switchMap(cityDetails => {
//       // tslint:disable-next-line: deprecation
//       return forkJoin(
//         cityDetails[0].LocalizedName,
//         this.getCurrentCondition(cityDetails[0].Key),
//         this.getForecast(cityDetails[0].Key)
//       );
//     }),
//     map(([cityName , currentData, dailyForecasts]) => {
//       return {
//         cityName,
//         currentCondition: currentData[0],
//         forecast: dailyForecasts
//       };
//     })
//   );
// }


// private getCityKeyFromAutoComplete(cityKey: string) {
//   return of(
//     [
//       {
//         Version: 1,
//         Key: '215613',
//         Type: 'City',
//         Rank: 45,
//         LocalizedName: 'Ashdod',
//         Country: {
//           ID: 'IL',
//           LocalizedName: 'Israel'
//         },
//         AdministrativeArea: {
//           ID: 'D',
//           LocalizedName: 'Southern District'
//         }
//       }
//     ]
//   );
// }


// .pipe(
//   switchMap(({ Key, LocalizedName  }) => {
//     // tslint:disable-next-line: deprecation
//     return forkJoin(
//       LocalizedName,
//       this.getCurrentCondition(Key),
//       this.getForecast(Key)
//     );
//   }),
//   map(([cityName , currentData, dailyForecasts]) => {
//     return {
//       cityName,
//       currentCondition: currentData[0],
//       forecast: dailyForecasts
//     };
//   })
// );



// private getCurrentConditionMock(cityKey: string) {
//   return of(
//     [
//       {
//         LocalObservationDateTime: '2020-06-13T21:15:00+03:00',
//         EpochTime: 1592072100,
//         WeatherText: 'Clear',
//         WeatherIcon: 33,
//         HasPrecipitation: false,
//         PrecipitationType: null,
//         IsDayTime: false,
//         Temperature: {
//           Metric: {
//             Value: 25.5,
//             Unit: 'C',
//             UnitType: 17
//           },
//           Imperial: {
//             Value: 78,
//             Unit: 'F',
//             UnitType: 18
//           }
//         },
//         MobileLink: 'http://m.accuweather.com/en/il/ashdod/215613/current-weather/215613?lang=en-us',
//         Link: 'http://www.accuweather.com/en/il/ashdod/215613/current-weather/215613?lang=en-us'
//       }
//     ]
//   );
// }

// private getForecastMock(cityKey: string) {
//   return of(
//     {
//       Headline: {
//         EffectiveDate: '2020-06-14T08:00:00+03:00',
//         EffectiveEpochDate: 1592110800,
//         Severity: 7,
//         Text: 'Not as hot Sunday',
//         Category: 'cooler',
//         EndDate: '2020-06-14T20:00:00+03:00',
//         EndEpochDate: 1592154000,
//         MobileLink: 'http://m.accuweather.com/en/il/ashdod/215613/extended-weather-forecast/215613?lang=en-us',
//         Link: 'http://www.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?lang=en-us'
//       },
//       DailyForecasts: [
//         {
//           Date: '2020-06-13T07:00:00+03:00',
//           EpochDate: 1592020800,
//           Temperature: {
//             Minimum: {
//               Value: 68,
//               Unit: 'F',
//               UnitType: 18
//             },
//             Maximum: {
//               Value: 93,
//               Unit: 'F',
//               UnitType: 18
//             }
//           },
//           Day: {
//             Icon: 1,
//             IconPhrase: 'Sunny',
//             HasPrecipitation: false
//           },
//           Night: {
//             Icon: 33,
//             IconPhrase: 'Clear',
//             HasPrecipitation: false
//           },
//           Sources: [
//             'AccuWeather'
//           ],
//           MobileLink: 'http://m.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=1&lang=en-us',
//           Link: 'http://www.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=1&lang=en-us'
//         },
//         {
//           Date: '2020-06-14T07:00:00+03:00',
//           EpochDate: 1592107200,
//           Temperature: {
//             Minimum: {
//               Value: 67,
//               Unit: 'F',
//               UnitType: 18
//             },
//             Maximum: {
//               Value: 81,
//               Unit: 'F',
//               UnitType: 18
//             }
//           },
//           Day: {
//             Icon: 1,
//             IconPhrase: 'Sunny',
//             HasPrecipitation: false
//           },
//           Night: {
//             Icon: 33,
//             IconPhrase: 'Clear',
//             HasPrecipitation: false
//           },
//           Sources: [
//             'AccuWeather'
//           ],
//           MobileLink: 'http://m.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=2&lang=en-us',
//           Link: 'http://www.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=2&lang=en-us'
//         },
//         {
//           Date: '2020-06-15T07:00:00+03:00',
//           EpochDate: 1592193600,
//           Temperature: {
//             Minimum: {
//               Value: 67,
//               Unit: 'F',
//               UnitType: 18
//             },
//             Maximum: {
//               Value: 81,
//               Unit: 'F',
//               UnitType: 18
//             }
//           },
//           Day: {
//             Icon: 1,
//             IconPhrase: 'Sunny',
//             HasPrecipitation: false
//           },
//           Night: {
//             Icon: 34,
//             IconPhrase: 'Mostly clear',
//             HasPrecipitation: false
//           },
//           Sources: [
//             'AccuWeather'
//           ],
//           MobileLink: 'http://m.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=3&lang=en-us',
//           Link: 'http://www.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=3&lang=en-us'
//         },
//         {
//           Date: '2020-06-16T07:00:00+03:00',
//           EpochDate: 1592280000,
//           Temperature: {
//             Minimum: {
//               Value: 66,
//               Unit: 'F',
//               UnitType: 18
//             },
//             Maximum: {
//               Value: 82,
//               Unit: 'F',
//               UnitType: 18
//             }
//           },
//           Day: {
//             Icon: 1,
//             IconPhrase: 'Sunny',
//             HasPrecipitation: false
//           },
//           Night: {
//             Icon: 34,
//             IconPhrase: 'Mostly clear',
//             HasPrecipitation: false
//           },
//           Sources: [
//             'AccuWeather'
//           ],
//           MobileLink: 'http://m.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=4&lang=en-us',
//           Link: 'http://www.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=4&lang=en-us'
//         },
//         {
//           Date: '2020-06-17T07:00:00+03:00',
//           EpochDate: 1592366400,
//           Temperature: {
//             Minimum: {
//               Value: 71,
//               Unit: 'F',
//               UnitType: 18
//             },
//             Maximum: {
//               Value: 85,
//               Unit: 'F',
//               UnitType: 18
//             }
//           },
//           Day: {
//             Icon: 1,
//             IconPhrase: 'Sunny',
//             HasPrecipitation: false
//           },
//           Night: {
//             Icon: 33,
//             IconPhrase: 'Clear',
//             HasPrecipitation: false
//           },
//           Sources: [
//             'AccuWeather'
//           ],
//           MobileLink: 'http://m.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=5&lang=en-us',
//           Link: 'http://www.accuweather.com/en/il/ashdod/215613/daily-weather-forecast/215613?day=5&lang=en-us'
//         }
//       ]
//     }
//   );
// }
