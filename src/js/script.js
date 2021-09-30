{
  'use strict';

  class BookList{
    constructor(){
      const thisBook = this;
      thisBook.initData();
      thisBook.getElements();
      thisBook.renderIn();
      thisBook.initActions();
    }
    
    initData(){
      this.data = dataSource.books;
    }

    getElements(){
      const thisBook = this;
      thisBook.booksList = document.querySelector('.books-list');
      thisBook.templates = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      thisBook.filteredBooks = document.querySelector('.filters');
      thisBook.filters = [];
      thisBook.favoriteBooks = [];
    }


    renderIn(){
      const thisBook = this;
      for(let element of dataSource.books){


        const html = thisBook.templates(element);
        const domElement = utils.createDOMFromHTML(html);

        thisBook.booksList.appendChild(domElement);

        const ratingBgc = thisBook.determineRatingBgc(element.rating);
        const ratingWidth = ratingBgc * 10;

        element.ratingBgc = ratingBgc;
        element.ratingWidth = ratingWidth;
      }

    }

    initActions(){
      const thisBook = this;

      const booksImage = thisBook.booksList.querySelectorAll('.book__image');
      console.log(booksImage);
      for(let imageElement of booksImage)
        imageElement.addEventListener('dblclick', function(event){
          event.preventDefault();
          const bookID = imageElement.getAttribute('data-id');

          //mogę zmienić add na toggle
          if(!imageElement.classList.contains('favorite')){
            imageElement.classList.add('favorite');

            // const bookID = imageElement.getAttribute('data-id');

            thisBook.favoriteBooks.push(bookID);
            console.log(thisBook.favoriteBooks);
          } else {
            imageElement.classList.remove('favorite');
            thisBook.favoriteBooks.splice(thisBook.favoriteBooks.indexOf(bookID, 1));
            console.log(thisBook.favoriteBooks);
          }
      
        });

      thisBook.filteredBooks.addEventListener('click', function(event){
        const clickedElement = event.target;

        const tagName = clickedElement.tagName;

        const type = clickedElement.getAttribute('type');

        const name = clickedElement.getAttribute('name');

        const value = clickedElement.getAttribute('value');

        const clickedElementIsCheckbox = tagName== 'INPUT' && type == 'checkbox' && name == 'filter';

        console.log(value);

        if(clickedElementIsCheckbox && clickedElement.checked == true) {
          console.log('add', value);
          thisBook.filters.push(value);
          console.log(thisBook.filters);
        } else if(clickedElementIsCheckbox && clickedElement.checked == false) {
          console.log('delete', value);
          const valueIndex = thisBook.filters.indexOf(value);
          thisBook.filters.splice(valueIndex, 1);
        }
        thisBook.filterBooks();
      });
    
    }

    filterBooks(){
      const thisBook = this;

      for(let element of dataSource.books){
        let shouldBeHidden = false;
        for(const filter of thisBook.filters){
          if(!element.details[filter] == false){
            shouldBeHidden = true;
            break;
          }
        }
        const bookID = thisBook.booksList.querySelector('.book__image[data-id= "' + element.id + '"');
        if(shouldBeHidden === true){
          bookID.classList.add('hidden');
        } else {
          bookID.classList.remove('hidden');
        }
      }
    }

    // const rating = dataSource.books.rating;

    determineRatingBgc(rating){


      let ratingBackground = '';

      if(rating < 6) {
        ratingBackground = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8) {
        ratingBackground = 'linear-gradient(to bottom,  #b4df5b 0%, #b4df5b 100%)';
      } else if(rating > 8 && rating <= 9) {
        ratingBackground = 'linear-gradient(to bottom,  #299a0b 0%, #299a0b 100%)';
      } else if(rating >9) {
        ratingBackground = 'linear-gradient(to bottom,  #ff0084 0%, #ff0084 100%)';
      }

      return ratingBackground;

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

  }
  const app = new BookList();
  console.log(app);
}