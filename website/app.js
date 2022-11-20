/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const apiKey = "1d832d31b23e978affda91db4825c62d";
const generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", async () => {
  try {
    const zipCode = document.querySelector("#zip").value;
    const content = document.querySelector("#feelings").value;
    if (!zipCode) {
      alert("you mest zip code");
      return;
    }
    getWeatherTemp(zipCode)
      .then((temp) => {
        return postData(temp, content);
      })
      .then(() => {
        return getData();
      })
      .then((finelData) => {
        updateUI(finelData);
      });
  } catch (err) {
    console.log(err);
  }
});
async function getWeatherTemp(zipCode) {
  const fullUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
  const res = await fetch(fullUrl);
  const weatherData = await res.json();
  const temp = weatherData.main.temp;
  return temp;
}
async function postData(temp, content) {
  await fetch("/postData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: newDate,
      temp: temp,
      content: content,
    }),
  });
}
async function getData() {
  const nodeRes = await fetch("/getData");
  const finelData = await nodeRes.json();
  return finelData;
}
// update UI
async function updateUI() {
  const request = await fetch("/getData");
  try {
    const response = await request.json();
    document.getElementById("date").innerHTML = response.newData;
    document.getElementById("temp").innerHTML = response.temp + "&degC";
    document.getElementById("content").innerHTML = response.feelings;
  } catch (err) {
    console.log(err.message);
  }
}
