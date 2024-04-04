
const countrySelect = document.getElementById('country');
const dateSelect = document.getElementById('date');
const getDataButton = document.getElementById('getbtn');

axios.get('https://covid-193.p.rapidapi.com/countries', {
  headers: {
    'X-RapidAPI-Key': 'a60b73c228mshe2db7713b372d48p149fc5jsnefbbfc3f62cc',
  },
})
  .then(function (response) {
    const countries = response.data.response;

    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.text = country;
      countrySelect.appendChild(option);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get('https://covid-193.p.rapidapi.com/history', {
  params: {
    country: 'usa',
  },
  headers: {
    'X-RapidAPI-Key': 'a60b73c228mshe2db7713b372d48p149fc5jsnefbbfc3f62cc'
  },
})
  .then(function (response) {
    // const hist = response.data;
    // console.log(hist)
    const datesArray = response.data.response;

    datesArray.forEach(date => {
      const option = document.createElement('option');
      option.value = date.day;
      option.text = date.day;
      dateSelect.appendChild(option);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

getDataButton.addEventListener('click', function () {

  axios.get('https://covid-193.p.rapidapi.com/history', {
    params: {
      country: countrySelect.value,
      day: dateSelect.value
    },
    headers: {
      'X-RapidAPI-Key': 'a60b73c228mshe2db7713b372d48p149fc5jsnefbbfc3f62cc'
    },
  })
    .then(function (response) {
      const stats = response.data.response[0];
      console.log(stats)
      document.getElementById('countryName').textContent = stats.country;
      document.getElementById('active').textContent = stats.cases.active;
      document.getElementById('total').textContent = stats.cases.total;
      document.getElementById('death').textContent = stats.deaths.total;
      document.getElementById('recover').textContent = stats.cases.recovered;
    })
    .catch(function (error) {
      console.log(error);
    });
});



