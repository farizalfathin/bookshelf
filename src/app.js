import { addBook, optionSearch } from "../src/js/main.js";
import { loadDataFromStorage } from "../src/js/book.js";
import { searchContentBook } from "./js/util.js";

document.addEventListener('DOMContentLoaded', () => {
    if (typeof(Storage) !== undefined) {
        loadDataFromStorage();
    }
    optionSearch();

    document.getElementById('insert-book-form').addEventListener('submit', e => {
        e.preventDefault();
        addBook();
    });

    document.getElementById('search-button').addEventListener('click', () => {
        const inputSearchBook = document.getElementById('input-search');

        searchContentBook(inputSearchBook.value);
    });

    document.getElementById('remove-search-content').addEventListener('click', () => {
        document.getElementById('content-search-container').innerHTML = '';
    });
});