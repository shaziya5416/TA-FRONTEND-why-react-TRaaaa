let input = document.querySelector(`input[type="text"]`);
let rootElm = document.querySelector('.movies_list');

let allMovies = [];

input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    allMovies.push({
      name: event.target.value,
      watched: false,
    });
    createMovieUI();
    event.target.value = '';
  }
});
function elm(type, attr = {}, ...children) {
  let element = document.createElement(type);
  for (let key in attr) {
    if (key.startsWith('data-')) {
      element.setAttribute(key, attr[key]);
    } else if (key.startsWith('on')) {
      let eventType = key.replace('on', '').toLowerCase();
      element.addEventListener(eventType, attr[key]);
    } else {
      element[key] = attr[key];
    }
  }
  children.forEach((child) => {
    if (typeof child === 'object') {
      element.append(child);
    }
    if (typeof child === 'string') {
      let node = document.createTextNode(child);
      element.append(node);
    }
  });
  return element;
}
function deleteItems(event) {
  let id = event.target.dataset.id;
  allMovies.splice(id, 1);
  createMovieUI();
}
function handleChange(event) {
  let id = event.target.id;
  allMovies[id].watched = !allMovies[id].watched;
  createMovieUI();
}
function createMovieUI(data = allMovies) {
  rootElm.innerText = '';
  data.forEach((movie, i) => {
    let li = elm(
      'li',
      {},
      elm('label', { for: i }, movie.name),
      elm(
        'button',
        {
          id: i,
          onClick: handleChange,
        },
        movie.watched ? 'Watched' : 'To Watch'
      )
    );
    rootElm.append(li);

    input.innerHTML = '';
  });
}

createMovieUI();