import { DailyForecast } from './dailyForecast.model';
import { ForecastHeadline } from './forecast-headline.model';

export interface Forecast {
  Headline: ForecastHeadline;
  DailyForecasts: DailyForecast[];
}
