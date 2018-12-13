// Book Constructor
function Book(title,author,isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


//  UI CONSTRUCTUOR 
function UI() {}

//Add Book to List

UI.prototype.addBookToList = function(book){
 const list = document.getElementById('book-list');
 //create tr element
 const row = document.createElement('tr');
 //insert cols
 row.innerHTML=  `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href="#" class="delete">X<a></td>
 `;

 list.appendChild(row);
}
//Show alert
UI.prototype.showAlert = function(message,className){
  //create a div
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

UI.prototype.delteBook = function (target) {
  if(target.className==='delete') {
    target.parentElement.parentElement.remove();
  }
}
//Clear Field
UI.prototype.clearField = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}



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
     ui.addBookToList(book);

     //show success
     ui.showAlert('Book Added','success');
      //Clear fields
      ui.clearField();
   }

  


  e.preventDefault();
});

//Event Listener for delete book
document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI();
  ui.delteBook(e.target);
  //show alert
  ui.showAlert("Book removed!",'seuccess');
e.preventDefault();
});