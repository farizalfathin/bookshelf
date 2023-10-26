import { books, generateId, generateBookObject, RENDER_EVENT, saveData } from "./book.js";
import { finishedReadingFromUnFinished, unFinishedReadingFromFinished, removeBook } from "./util.js";

const optionSearch = () => {
    const optionBooks = document.querySelector('#option-books');
    optionBooks.innerHTML = '';

    books.forEach(book => {
        const option = document.createElement('option');
        option.setAttribute('value', book.bookTitle);
    
        optionBooks.append(option);
    });
    return optionBooks;
}

const finishedReadingCount = () => {
    const finishedReadingContainer = document.getElementById('finished-reading-container');

    let childrenContainer = finishedReadingContainer.children

    let childrenCount = childrenContainer.length;
    const finishedReadingCount = document.getElementById('finished-reading-count');

    finishedReadingCount.textContent = childrenCount;
}

const unFinishedReadingCount = () => {
    const unFinishedReadingContainer = document.getElementById('unfinished-reading-container');

    let childrenContainer = unFinishedReadingContainer.children

    let childrenCount = childrenContainer.length;
    const unFinishedReadingCount = document.getElementById('unfinished-reading-count');
    
    unFinishedReadingCount.textContent = childrenCount;
}



const addBook = () => {
    const inputBookTitle = document.getElementById('input-book-title').value;
    const inputBookAuthor = document.getElementById('input-book-author').value;
    const inputYearReleased = document.getElementById('input-year-released').value;
    const inputStatusBook = document.getElementById('input-status-book');
    const checkStatusBook = inputStatusBook.checked? true : false;

    const generatedId = generateId();
    const bookObject = generateBookObject(generatedId, inputBookTitle, inputBookAuthor, inputYearReleased, checkStatusBook);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    optionSearch();
}

const makeBook = bookObject => {
    const bookTitle = document.createElement('h4');
    bookTitle.innerText = bookObject.bookTitle;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = bookObject.bookAuthor;

    const yearReleased = document.createElement('p');
    yearReleased.innerText = bookObject.yearReleased;

    const contentBookInfo = document.createElement('div');
    contentBookInfo.classList.add('content-book-info');
    contentBookInfo.append(bookTitle, bookAuthor, yearReleased);

    const contentBook = document.createElement('div');
    contentBook.classList.add('content-book');
    contentBook.append(contentBookInfo);

    const removeBookButton = document.createElement('button');
    removeBookButton.innerText = 'Remove Book';
    removeBookButton.addEventListener('click', () => {
        removeBook(bookObject.id)
        finishedReadingCount();
        unFinishedReadingCount();
        optionSearch()
    });

    if(bookObject.isFinishedReading) {
        const unFinishedReadingButton = document.createElement('button');
        unFinishedReadingButton.innerText = 'Unfinished Reading'
        unFinishedReadingButton.addEventListener('click', () => {
            unFinishedReadingFromFinished(bookObject.id);
        });

        const contentBookCheck = document.createElement('div')
        contentBookCheck.classList.add('content-book-check');
        contentBookCheck.append(unFinishedReadingButton, removeBookButton);

        contentBook.append(contentBookCheck);
    }else {
        contentBook.classList.add('unfinished-count');

        const finishedReadingButton = document.createElement('button');
        finishedReadingButton.innerText = 'Finished Reading';
        finishedReadingButton.addEventListener('click', () => {
            finishedReadingFromUnFinished(bookObject.id);
        });

        const contentBookCheck = document.createElement('div')
        contentBookCheck.classList.add('content-book-check');
        contentBookCheck.append(finishedReadingButton, removeBookButton);

        contentBook.append(contentBookCheck);
    }

    return contentBook;
}

document.addEventListener(RENDER_EVENT, () => {
    const unFinishedReadingContainer = document.getElementById('unfinished-reading-container');
    unFinishedReadingContainer.innerHTML = '';

    const finishedReadingContainer = document.getElementById('finished-reading-container');
    finishedReadingContainer.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if(!bookItem.isFinishedReading) {
            unFinishedReadingContainer.append(bookElement);
            unFinishedReadingCount();
            finishedReadingCount();
        }else {
            finishedReadingContainer.append(bookElement);
            unFinishedReadingCount();
            finishedReadingCount();
        }
    }
});

export {addBook, optionSearch}