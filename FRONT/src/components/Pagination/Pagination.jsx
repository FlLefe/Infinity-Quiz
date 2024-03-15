import './Pagination.scss'

export default function Pagination({ itemsPerPage, totalItems, currentPage, paginate }) {
  const pageNumbers = [];
  const maxDisplayedPages = 4;
  let startPage, endPage;

  if (totalItems / itemsPerPage <= maxDisplayedPages) {
    startPage = 1;
    endPage = Math.ceil(totalItems / itemsPerPage);
  } else {
    if (currentPage <= Math.floor(maxDisplayedPages / 2) + 1) {
      startPage = 1;
      endPage = maxDisplayedPages;
    } else if (currentPage + Math.floor(maxDisplayedPages / 2) >= totalItems / itemsPerPage) {
      startPage = Math.max(1, Math.ceil(totalItems / itemsPerPage) - maxDisplayedPages + 1);
      endPage = Math.ceil(totalItems / itemsPerPage);
    } else {
      startPage = currentPage - Math.floor(maxDisplayedPages / 2);
      endPage = currentPage + Math.floor(maxDisplayedPages / 2);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginationContainer">
      <div className="pagination">
        <button className='skipBtn' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}><img src='/icons/chevron-left-pink.svg' alt='Page précédente'></img></button>
        <ul>
          {pageNumbers.map((number) => (
            <li key={number} className={`pageItem ${number === currentPage ? 'activePage' : ''}`}>
              <button onClick={() => paginate(number)} className="pageLink">
                {number}
              </button>
            </li>
          ))}
        </ul>
        <button className='skipBtn' onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}><img src='/icons/chevron-right-pink.svg' alt='Page suivante'></img></button>
      </div>
    </div>
  );
}
