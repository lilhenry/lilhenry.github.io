function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
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
      // 10: get ten random countries from returned value list
      //     use math.random
      //     use range
      //     use map

      // 11: sort in reverse alphabetical order
      //     use sort
      //     use sort function provided

      // 12: inject ordered list element
      //     use JS
      //     classname "flex-inner"
      //     document.createElement
      //     easier with jQuery append and prepend

      // 13: inject list element
      //     contains checkbox and label
      //     for each country
      //     country name visible
      //     include country code as value for input
      //     checkboxes have same name (key for form data)
      //     labels attached using "for" and "id" attributes

      // 14: on each click of button
      //     replace checkbox list with a new one

      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});