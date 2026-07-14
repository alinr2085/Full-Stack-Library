export const Pagination = ({
  currentPage,
  totalPage,
  paginate,
}: {
  currentPage: number;
  totalPage: number;
  paginate: (pageNumber: number) => void;
}) => {
  const pageNumberDisplayed = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  currentPage < 1 ? null : pageNumberDisplayed.push(currentPage - 1);
  pageNumberDisplayed.push(currentPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  currentPage + 1 === totalPage
    ? null
    : pageNumberDisplayed.push(currentPage + 1);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item" onClick={() => paginate(0)}>
          <button className="page-link">First Page</button>
        </li>
        {pageNumberDisplayed.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={"page-item " + (currentPage === number ? "active" : "")}
          >
            <button className="page-link">{number + 1}</button>
          </li>
        ))}
        <li className="page-item" onClick={() => paginate(totalPage - 1)}>
          <button className="page-link">Last Page</button>
        </li>
      </ul>
    </nav>
  );
};
