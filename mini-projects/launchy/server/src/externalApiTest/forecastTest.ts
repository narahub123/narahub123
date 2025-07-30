const forecastTest = async () => {
  console.log("안녕");
  await fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=uDj%2FV2HXf0iwiWq1sJm6RfnDmhGGfYLQO8JY%2BnEn30hbnAG9vOzY383V8MRIA0P6q4J3S15Vnp8rGQNQ%2Fbv6ow%3D%3D&numOfRows=10&pageNo=1&base_date=20250730&base_time=2000&nx=61&ny=125&dataType=json`
  )
    .then((res) => res.json())
    .then((data) => console.log(data.response.body.items));

  //   await fetch(
  //     `http://api.openweathermap.org/geo/1.0/direct?q=역삼동&limit=5&appid=da0e1ecb9b96e28411cdb5f4c0198a78`
  //   )
  //     .then((res) => res.json())
  //     .then(async (data) => {
  //       console.log(data);

  //       return await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&id&appid=da0e1ecb9b96e28411cdb5f4c0198a78&lang=kr`
  //       );
  //     })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
};

forecastTest();
