const STORAGE_KEY = 'BOOKSHELF_APPS';

let bookshelfs = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(bookshelfs);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) bookshelfs = data;

  document.dispatchEvent(new Event('ondataloaded'));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composeBookshelfObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findBookshelf(bookshelfId) {
  for (bookshelf of bookshelfs) {
    if (bookshelf.id === bookshelfId) return bookshelf;
  }

  return null;
}

function checkItemFromStorage(bookTitel) {
  for (bookshelf of bookshelfs) {
    if (bookshelf.title === bookTitel) {
      alert('hanya mengingatkan kok judul buku ada yang sama');
    }
  }

  return;
}

function findBookshelfIndex(bookshelfId) {
  let index = 0;
  for (bookshelf of bookshelfs) {
    if (bookshelf.id === bookshelfId) return index;

    index++;
  }

  return -1;
}
