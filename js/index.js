document.addEventListener('DOMContentLoaded', function () {
  const submitBook = document.getElementById('inputBook');

  submitBook.addEventListener('submit', function (event) {
    event.preventDefault();
    addBookItem();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener('ondatasaved', () => {
  // console.log('Data berhasil di simpan.');
});

document.addEventListener('ondataloaded', () => {
  refreshDataFromStorage();
});
