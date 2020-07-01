import * as fromWeather from './weather.actions';

describe('loadWeathers', () => {
  it('should return an action', () => {
    expect(fromWeather.loadWeather().type).toBe('[Weather] Load Weathers');
  });
});
