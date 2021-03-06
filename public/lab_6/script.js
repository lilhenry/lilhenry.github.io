function getRandom(min, max) {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

// async = asychronous function
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      //  10
      const ten = range(10);
      const tencountries = ten.map(() => {
        const num = getRandom(0, 242);
        return fromServer[num];
      });

      // 11
      const revorder = tencountries.sort((first, second) => sortFunction(second, first, 'name'));

      // 12
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const newol = document.createElement('ol');
      newol.className = 'flex-inner';
      const formel = document.querySelector('form');
      formel.prepend(newol);

      // 13
      revorder.forEach((country, i) => {
        const item = document.createElement('li');
        $(item).append('<input type="checkbox" value=' +country.code+ ' id=' +country.code+ ' name="countries" />');
        $(item).append('<label for=' +country.code+ '>' +country.name+ '</label>');
        $(newol).append(item);
      });

      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});