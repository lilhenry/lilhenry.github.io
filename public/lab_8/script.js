function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customcolors', [
    // done: add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
    '#3B5761',
    '#598391',
    '#6DA1B3'
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customcolors',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants By Category',
      labelFontSize: 12
    },
    axisY2: {
      interval: 1,
      labelFontSize: 10
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  // debugging
  console.log('jsonFromServer', jsonFromServer);

  // unit testing don't touch
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer));

  // options passing in data from server
  const options = makeYourOptionsObject(jsonFromServer);
  // const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  // const options = makeYourOptionsObject(reorganizedData);

  // chart
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});