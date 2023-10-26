import { RENDER_EVENT, books, findBook, findBookIndex, saveData } from "./book.js"


const finishedReadingFromUnFinished = bookId => {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isFinishedReading = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

const unFinishedReadingFromFinished = bookId => {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isFinishedReading = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

const removeBook = bookId => {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    dialogShow(bookTarget);
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

const dialogShow = bookId => {
    const dialog = document.getElementById('dialog');

    document.getElementById('book-title-dialog').innerText = books[bookId].bookTitle
    document.getElementById('book-author-dialog').innerText = books[bookId].bookAuthor
    document.getElementById('year-released-dialog').innerText = books[bookId].yearReleased

    dialog.show();

    setTimeout(() => {
        dialog.close();
    }, 3000)
}

const searchContentBook = searchBook => {
    const contentSearchContainer = document.getElementById('content-search-container');
    contentSearchContainer.innerHTML = '';

    if (searchBook === '') return;

    const matchingValues = books.filter(book => book.bookTitle.toLowerCase().startsWith(searchBook.toLowerCase()));

    if (matchingValues.length > 0) {
        matchingValues.forEach(value => {
            const contentBook = document.createElement('div')
            contentBook.classList.add('content-book');

            const convertStatusReading = value.isFinishedReading === true? 'Finished Reading' : 'Unfinished Reading';

            const styleForStatusReading = convertStatusReading === 'Finished Reading'? 'lightgreen' : 'red';

            contentBook.innerHTML = `
            <div class="content-book-info">
                <h4>${value.bookTitle}</h4>
                <p>${value.bookAuthor}</p>
                <p>${value.yearReleased}</p>
            </div>
            <div class="content-book-status">
                <p>Status</p>
                <span style="background-color: ${styleForStatusReading};">${convertStatusReading}</span>
            </div>`;

            contentSearchContainer.append(contentBook);
        })
    }
    return contentSearchContainer;
}

export { finishedReadingFromUnFinished, unFinishedReadingFromFinished, removeBook, searchContentBook }