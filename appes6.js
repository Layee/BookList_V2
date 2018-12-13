class Book {
   constructor(title, author, isbn) {
     this.title = title;
     this.author = author;
     this.isbn = isbn;
   }
}
//Methods
class   UI {
 addBook(book){
   const list = document.getElementById('book-list');
   //create tr element
   const row = document.createElement('tr');
   //insert cols
   row.innerHTML=  `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href="#" class="delete">X<a></td>`;
     list.appendChild(row);
}
showAlert(message,className){
        const div = document.createElement('div');
        div.className= `alert ${className}`;
        //Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
         const container = document.querySelector('.container');
         const form = document.querySelector('#book-form');
        //insert alert
        container.insertBefore(div,form);
        //Timeout after 3 secs
        setTimeout(function(){
        document.querySelector('.alert').remove();
       },3000);
}
deleteBook(target){
        if(target.className==='delete') {
          target.parentElement.parentElement.remove();
        }
}
clearFields(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';    
}
}
//Local Storage class
// Static meaning we don't instantiate the class

class Store {
 static getBooks(){
       //get book from local storage
     let books;
     if(localStorage.getItem('books')  === null) {
        books = [];

     }  else {
         // Turn it into js object using json.parse
         books = JSON.parse(localStorage.getItem('books'));
     }
       return books;
  }
 static displayBooks() {
      //get the book
      const books = Store.getBooks();
      //loop through the books
      books.forEach(function(book){
           //instantiate ui
           const ui = new UI;

          //add books to UI
          ui.addBook(book);
      });

  } static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      //use json.stringify in order to store it in local storage
      localStorage.setItem('books', JSON.stringify(books));

  }
    static removeBook(isbn) {
       // get books from local storage
       const books = Store.getBooks();
           books.forEach(function(book,index){
              if(book.isbn === isbn) {
                books.splice(index,1);
              }
           });
       localStorage.setItem('books', JSON.stringify(books)); 
   }
}
// DOM LOAD EVENT 
document.addEventListener('DOMContentLoaded',Store.displayBooks);
//Event Listeners for add book
document.getElementById('book-form').addEventListener('submit',function(e){
  //Get form Values
  const title = document.getElementById('title').value,
   author = document.getElementById('author').value,
   isbn   = document.getElementById('isbn').value;
   //Instantiate Book
   const book = new Book(title, author, isbn);
   //Instantiate UI 
   const ui = new UI();
   //Validate
   if(title ===''|| author ==='' || isbn === '') {
      //Error alert
        ui.showAlert('Please fill in all fields','error');
   } else {
     //add book to list
     ui.addBook(book);

     //Add Book to local storage
     Store.addBook(book);

     //show success
     ui.showAlert('Book Added','success');
      //Clear fields
      ui.clearFields();
   }
  e.preventDefault();
});

//Event Listener for delete book
document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  //Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //show alert
  ui.showAlert("Book removed!",'seuccess');
e.preventDefault();
});