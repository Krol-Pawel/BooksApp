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

  const filters = [];

  const filteredBooks = document.querySelector('.filters');
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
          favoriteBooks.splice(favoriteBooks.indexOf(bookID, 1));
          console.log(favoriteBooks);
        }
      
      });

    filteredBooks.addEventListener('click', function(event){
      const clickedElement = event.target;

      const tagName = clickedElement.tagName;

      const type = clickedElement.getAttribute('type');

      const name = clickedElement.getAttribute('name');

      const value = clickedElement.getAttribute('value');

      const clickedElementIsCheckbox = tagName== 'INPUT' && type == 'checkbox' && name == 'filter';

      console.log(value);

      if(clickedElementIsCheckbox && clickedElement.checked == true) {
        console.log('add', value);
        filters.push(value);
        console.log(filters);
      } else if(clickedElementIsCheckbox && clickedElement.checked == false) {
        console.log('delete', value);
        const valueIndex = filters.indexOf(value);
        filters.splice(valueIndex, 1);
      }
      filterBooks()
    });
    
  }

  function filterBooks(){
    for(let element of dataSource.books){
      let shouldBeHidden = false;
      for(const filter of filters){
        if(!element.details[filter] == false){
          shouldBeHidden = true;
          break;
        }
      }
      const bookID = booksList.querySelector('.book__image[data-id= "' + element.id + '"');
      if(shouldBeHidden === true){
        bookID.classList.add('hidden')
      } else {
        bookID.classList.remove('hidden')
      }
    }
  }



  // function initActions(){

  //   const favoriteBooks = [];
  //   console.log(booksList);
  //   booksList.addEventListener('dblclick', function(event){
  //     event.preventDefault();
  //     const booksImage = booksList.querySelectorAll('.book__image');
  //     const clickedElement = event.target.offsetParent.classList.contains('.book__image');
  //     console.log('event.target', clickedElement);

  //     if(clickedElement) {
  //       const bookAttribute = event.target.offsetParent.getAttribute('data-id');

  //       if(!event.target.offsetParent.classList.contains('favorite')){
  //         booksImage.classList.add('favorite');
  //         favoriteBooks.push(bookAttribute);
  //       } else {
  //         booksImage.classList.remove('favorite');
  //         favoriteBooks.splice(favoriteBooks.indexOf(bookAttribute, 1));
  //       }
  //     } else {
  //       console.log('clicked element is not a book');
  //     }


  //   });
  // }
  renderIn();
  initActions();

}