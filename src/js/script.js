{
  'use strict';

  const booksList = document.querySelector('.books-list');
  const templates = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  function renderIn(){
    for(let element of dataSource.books){
      const html = templates(element);
      const domElement = utils.createDOMFromHTML(html);

      booksList.appendChild(domElement);
    }

  }


  const favoriteBooks = [];
  function initActions(){
    const booksImage = booksList.querySelectorAll('.book__image');
    console.log(booksImage);
    for(let imageElement of booksImage)
      imageElement.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookID = imageElement.getAttribute('data-id');

        //mogę zmienić add na toggle
        if(!imageElement.classList.contains('favorite')){
          imageElement.classList.add('favorite');

        // const bookID = imageElement.getAttribute('data-id');

          favoriteBooks.push(bookID);
          console.log(favoriteBooks);
        } else {
          imageElement.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(bookID, 1))
          console.log(favoriteBooks);
        }
      
      });
    
  }
  renderIn();
  initActions();

}