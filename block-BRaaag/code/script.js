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
let elm = React.createElement;
function createMovieUI(data = allMovies) {
  // rootElm.innerText = '';
  let ui = data.map((movie, i) => {
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

    input.innerHTML = '';
    return li;
  });
  ReactDOM.render(ui, rootElm);
}

createMovieUI();