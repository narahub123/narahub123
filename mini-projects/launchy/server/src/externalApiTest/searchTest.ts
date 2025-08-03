import dotenv from "dotenv";
dotenv.config();

const searchTest = async () => {
  await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=역삼동&limit=5&appid=${process.env.OPEN_WEATHER_ID}`
  )
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data);

      return await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword?query=스파게티스토리&x=${data[0].lon}&y=${data[0].lat}&radius=200`,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `KakaoAK ${process.env.KAKAO_REST_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    });
};

searchTest();
