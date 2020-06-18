export interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
  };
  Day: {
    Icon: number,
    IconPhrase: string,
    HasPrecipitation: boolean
  };
  Night: {
    Icon: number,
    IconPhrase: string,
    HasPrecipitation: boolean
  };
  Sources: string[];
  MobileLink: string;
  Link: string;
}
