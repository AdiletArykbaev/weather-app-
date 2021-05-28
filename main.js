const APIkey = `44f1cb6eb6af835fd1cabec960410ae7`
const appInput = document.querySelector("#app__input");
const searchBtn = document.querySelector("#search__button")

searchBtn.addEventListener("click",function(){
  if(appInput.value.length >= 3){
    appInit()
  }else{
    alert("введите корректное значениe")
  }
  
  
})


function appInit(){
    let tmpArr = appInput.value.split("")
    let city = tmpArr[0].toUpperCase() + tmpArr.slice(1).join("")
    
    try{
         fetch(`https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          
          console.log(data)
          const weather = data.weather
          const cityName = document.querySelector("#city-name")
          
          const weatherStatus = document.querySelector("#weather-status")
          const weatherTemp = document.querySelector("#weather-temp")
          
          const weatherIcon = document.querySelector("#weather-icon")

          const dateBlock = document.querySelector("#todays-date")
          
          const appBody = document.querySelector(".weather-app")
          appBody.style["display"] = "block"


          let today = new Date();
          let  dd = String(today.getDate()).padStart(2, '0');
          let  mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          let  yyyy = today.getFullYear();
          
          today = dd + '/' + mm  + '/' + yyyy;

          dateBlock.innerHTML = today


          weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
          
          
          cityName.innerText = data.name
          
          weatherStatus.innerText = weather[0].main
          
          weatherTemp.innerHTML = `${Math.floor(data.main.temp - 273)} C &deg `
   
        });
    }catch(error){
        alert(error)
    }

    appInput.value = ""
    
}

