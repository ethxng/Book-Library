class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get getTitle(){
        return this.title;
    }
    get getAuthor(){
        return this.author;
    }
    get getPages() {
        return this.pages;
    }
    get haveRead() {
        return this.read;
    }
    set setReadStatus(stat){
        this.read = stat;
    }
}

// these 2 functions are for the forms that pop up to add book
function openForm(){
    //blank out all boxes before opening the form
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
    
    let form = document.getElementsByClassName('popUp');
    form[0].style.display = "block";
}

function closeForm(){
    let form = document.getElementsByClassName('popUp');
    form[0].style.display = 'none';
}

// this function is for change the status of the book to read or not
function changeReadStatus(obj) {
    let button = document.querySelectorAll('.readButton');
    button.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (obj.haveRead){
                btn.style.cssText = "font-size: 50px; margin-left: 60px; margin-top: 20px; margin-bottom: 15px; background-color: red";
                btn.textContent = "Not Read";
                obj.setReadStatus = false;
            }
            else{
                btn.style.cssText = "font-size: 50px; margin-left: 60px; margin-top: 20px; margin-bottom: 15px; background-color: green";
                btn.textContent = "Read";
                obj.setReadStatus = true;
            }
        });
    });
}

// remove tbe book if click the remove button
function removeCard(obj){
    const removeButton = document.querySelectorAll('.removeButton');
    removeButton.forEach((btn) => {
        btn.addEventListener("click", () => {
            let card = btn.parentNode;
            //container.removeChild(card);
            card.parentNode.removeChild(card);

            // remove that object from the library
            for (i = 0; i < myLibrary.length; i++){
                if (myLibrary[i].getTitle === obj.getTitle && myLibrary[i].getAuthor === obj.getAuthor && myLibrary[i].getPages === obj.getPages && myLibrary[i].haveRead === obj.haveRead){
                    myLibrary.splice(i, 1);
                    i--;
                }
            }
        });
    });
}

// build the layout of the card when received the data
function buildLayout(str, obj){
    // str is the className for which you need to append the child INTO
    let card = document.querySelector('.' + str);
    // create title
    let Title = document.createElement('div');
    Title.textContent = obj.getTitle;
    Title.style.cssText = "display: flex; justify-content: center; font-size: 50px";

    //create author
    let Author = document.createElement('div');
    Author.textContent = obj.getAuthor;
    Author.style.cssText = "display: flex; justify-content: center; font-size: 50px; margin-top: 25px";

    // create pages
    let Pages = document.createElement('div');
    Pages.textContent = obj.getPages + ' pages';
    Pages.style.cssText = "display: flex; justify-content: center; font-size: 50px; margin-top: 25px";

    // create mark as read button
    let Read = document.createElement('button');
    Read.className = 'readButton';
    if (obj.haveRead){
        Read.textContent = "Read";
        Read.style.cssText = "font-size: 50px; margin-left: 60px; margin-top: 20px; margin-bottom: 15px; background-color: green";
    } else{
        Read.textContent = "Not Read";
        Read.style.cssText = "font-size: 50px; margin-left: 60px; margin-top: 20px; margin-bottom: 15px; background-color: red";
    }

    // create remove button
    let Remove = document.createElement('button');
    Remove.className = "removeButton";
    Remove.textContent = "Remove";
    Remove.style.cssText = "font-size: 50px; margin-left: 30px; margin-top: 20px; margin-bottom: 15px;background-color: red";
    card.appendChild(Title);
    card.appendChild(Author);
    card.appendChild(Pages);
    card.appendChild(Read);
    card.appendChild(Remove);
}

let myLibrary = [];
// main function, where all functions is ran inside
function main() {
    const container = document.querySelector('.box');
    let title = '', author = '', pages = '', haveRead = false;
    const collect = document.querySelector("#submit");
    collect.addEventListener("click", () => {
        title = document.getElementById('title').value;
        author = document.getElementById('author').value;
        pages = document.getElementById('pages').value;
        haveRead = document.getElementById('read').checked;
        // make sure all fields are filled before allowing to submit (except for haveRead)
        if (title.length != 0 && author.length != 0 && pages.length != 0){
            let book = new Book(title, author, pages, haveRead);
            myLibrary.push(book);
            let card = document.createElement('div');
            card.style.cssText = "display: inline-block; border: 2px solid black; background-color: gray; margin-top: 10px";
            // this will define the class name of each card (each card responds to each index of myLibrary)
            card.className = 'a' + (myLibrary.length - 1);
            container.appendChild(card);
            closeForm();
            buildLayout(card.className, book);

            // extra functions in each card
            changeReadStatus(book);
            removeCard(book);
        }
        else{
            alert("Please fill out all boxes before submitting!");
        }
    });
}
main();