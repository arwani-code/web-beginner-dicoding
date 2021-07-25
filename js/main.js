const COMPLETED_BOOKSHELF_LIST = 'completeBookshelfList';
const INCOMPLETED_BOOKSHELF_LIST = 'incompleteBookshelfList';
const BOOK_ITEMID = 'bookshelfId';

function makeBookItem(title, author, year, isCompleted) {
  const bookTitle = document.createElement('h3');
  bookTitle.innerText = title;

  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('author-item');
  bookAuthor.innerHTML = `Penulis: <span>${author}</span>`;

  const bookYear = document.createElement('p');
  bookYear.classList.add('year-item');
  bookYear.innerHTML = `Tahun: <span>${year}</span>`;

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('action');

  if (isCompleted) {
    btnContainer.append(moveBookItem(), deleteBookItem());
  } else {
    btnContainer.append(_moveBookItem(), deleteBookItem());
  }

  const bookItemContainer = document.createElement('article');
  bookItemContainer.classList.add('book_item');
  bookItemContainer.append(bookTitle, bookAuthor, bookYear, btnContainer);
  return bookItemContainer;
}

function buttonTemplate(buttonTypeClass, eventListener, textButton) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.innerText = textButton;
  button.addEventListener('click', function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function _moveBookItem() {
  return buttonTemplate(
    'green',
    function (event) {
      btnTaskComplete(event.target.parentElement.parentElement);
    },
    'selesai dibaca'
  );
}

function moveBookItem() {
  return buttonTemplate(
    'green',
    function (event) {
      btnTaskIncomplete(event.target.parentElement.parentElement);
    },
    'belum selesai dibaca'
  );
}

function deleteBookItem() {
  return buttonTemplate(
    'red',
    function (event) {
      btnTaskFromCompleted(event.target.parentElement.parentElement);
    },
    'hapus'
  );
}

function addBookItem() {
  const inputBookIsComplete = document.getElementById(
    'inputBookIsComplete'
  ).checked;
  const titleValue = document.getElementById('inputBookTitle').value;
  const authorValue = document.getElementById('inputBookAuthor').value;
  const yearValue = document.getElementById('inputBookYear').value;
  const incompleteBookItem = document.getElementById(
    INCOMPLETED_BOOKSHELF_LIST
  );
  const completeBookItem = document.getElementById(COMPLETED_BOOKSHELF_LIST);

  checkItemFromStorage(titleValue);

  if (inputBookIsComplete) {
    const bookItem = makeBookItem(titleValue, authorValue, yearValue, true);
    const bookObjectItem = composeBookshelfObject(
      titleValue,
      authorValue,
      yearValue,
      true
    );
    bookItem[BOOK_ITEMID] = bookObjectItem.id;
    bookshelfs.push(bookObjectItem);
    completeBookItem.append(bookItem);
  } else {
    const bookItem = makeBookItem(titleValue, authorValue, yearValue, false);
    const bookObjectItem = composeBookshelfObject(
      titleValue,
      authorValue,
      yearValue,
      false
    );
    bookItem[BOOK_ITEMID] = bookObjectItem.id;
    bookshelfs.push(bookObjectItem);
    incompleteBookItem.append(bookItem);
  }

  updateDataToStorage();
}

function btnTaskIncomplete(taskElement) {
  const incompleteBookItem = document.getElementById(
    INCOMPLETED_BOOKSHELF_LIST
  );
  const bookTitle = taskElement.querySelector('h3').innerText;
  const bookAuthor = taskElement.querySelector(
    'p.author-item > span'
  ).innerText;
  const bookYear = taskElement.querySelector('p.year-item > span').innerText;
  const newBookItem = makeBookItem(bookTitle, bookAuthor, bookYear, false);

  const bookItem = findBookshelf(taskElement[BOOK_ITEMID]);
  bookItem.isCompleted = false;
  newBookItem[BOOK_ITEMID] = bookItem.id;

  incompleteBookItem.append(newBookItem);
  taskElement.remove();
  updateDataToStorage();
}

function btnTaskComplete(taskElement) {
  const completeBookItem = document.getElementById(COMPLETED_BOOKSHELF_LIST);
  const bookTitle = taskElement.querySelector('h3').innerText;
  const bookAuthor = taskElement.querySelector(
    'p.author-item > span'
  ).innerText;
  const bookYear = taskElement.querySelector('p.year-item > span').innerText;

  const newBookItem = makeBookItem(bookTitle, bookAuthor, bookYear, true);

  const bookItem = findBookshelf(taskElement[BOOK_ITEMID]);
  bookItem.isCompleted = true;
  newBookItem[BOOK_ITEMID] = bookItem.id;

  completeBookItem.append(newBookItem);

  taskElement.remove();

  updateDataToStorage();
}

function btnTaskFromCompleted(taskElement /* HTMLELement */) {
  const itemPosition = findBookshelfIndex(taskElement[BOOK_ITEMID]);
  bookshelfs.splice(itemPosition, 1);

  taskElement.remove();
  updateDataToStorage();
}

function refreshDataFromStorage() {
  let incompleteBookItem = document.getElementById(INCOMPLETED_BOOKSHELF_LIST);
  let completeBookItem = document.getElementById(COMPLETED_BOOKSHELF_LIST);

  for (bookItem of bookshelfs) {
    const newBookItem = makeBookItem(
      bookItem.title,
      bookItem.author,
      bookItem.year,
      bookItem.isCompleted
    );
    newBookItem[BOOK_ITEMID] = bookItem.id;

    if (bookItem.isCompleted) {
      completeBookItem.append(newBookItem);
    } else {
      incompleteBookItem.append(newBookItem);
    }
  }
}
