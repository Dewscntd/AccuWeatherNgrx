import { CurrentCondition } from './current-condition.model';
import { Forecast } from './forecast.model';

export interface Weather {
  currentCondition: CurrentCondition;
  forecast: Forecast;
}
