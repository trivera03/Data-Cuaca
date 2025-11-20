async function getWeather() {
  const city = document.getElementById("city").value;
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "❗Mohon masukkan nama kota!";
    return;
  }

  const apiKey = "5c07495b9ba60c5bbe1655be364c5fb8";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      resultDiv.innerHTML = "❗Kota tidak ditemukan!";
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Suhu: <b>${data.main.temp}°C</b></p>
      <p>Kelembapan: ${data.main.humidity}%</p>
      <p>Cuaca: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    `;
  } catch (error) {
    resultDiv.innerHTML = "❗Gagal mengambil data API!";
  }
}
