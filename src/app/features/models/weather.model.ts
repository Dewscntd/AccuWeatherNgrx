import { CurrentCondition } from './current-condition.model';
import { Forecast } from './forecast.model';

export interface Weather {
  cityName: string;
  currentCondition: CurrentCondition;
  forecast: Forecast;
}
