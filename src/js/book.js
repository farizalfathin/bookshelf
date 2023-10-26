const books = [];
const RENDER_EVENT = 'render-book';
const STORAGE_KEY = 'DATA_BOOK'

const generateId = () => {
    return +new Date();
}

const generateBookObject = (id, bookTitle, bookAuthor, yearReleased, isFinishedReading) => {
    return {
        id,
        bookTitle,
        bookAuthor,
        yearReleased,
        isFinishedReading
    }
}

const findBook = bookId => {
    let foundBook = null;

    books.forEach(bookItem => {
        if (bookItem.id === bookId) {
            foundBook = bookItem;
        }
    });

    return foundBook;

    // for (const bookItem of books) {
    //     if (bookItem.id === bookId) {
    //         return bookItem;
    //     }
    // }
    // return null
}

const findBookIndex = bookId => {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

const saveData = () => {
    if (typeof(Storage) !== undefined) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
}

const loadDataFromStorage = () => {
    let dataStorage = JSON.parse(localStorage.getItem(STORAGE_KEY))

    if (dataStorage !== null) {
        for (const book of dataStorage) {
            books.push(book)
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}


export { books, generateId, generateBookObject, RENDER_EVENT, findBook, findBookIndex, saveData, loadDataFromStorage}