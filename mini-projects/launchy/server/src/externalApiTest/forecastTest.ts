import dotenv from "dotenv";
dotenv.config();

const forecastTest = async () => {
  //   await fetch(
  //     `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${process.env.FORECAST_ID}&numOfRows=10&pageNo=1&base_date=20250731&base_time=1100&nx=61&ny=125&dataType=json`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.response.body.items));

  await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=역삼동&limit=5&appid=${process.env.OPEN_WEATHER_ID}`
  )
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data);

      return await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&id&appid=${process.env.OPEN_WEATHER_ID}&lang=kr`
      );
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

forecastTest();
