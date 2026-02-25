// components/general/Pagination.js
import Pagination from "react-js-pagination";

function definePagination(props) {
  return (
    props.total > 0 && (
      <Pagination
        activePage={props.currentPage}
        itemsCountPerPage={props.perPage}
        totalItemsCount={props.total}
        pageRangeDisplayed={5}
        onChange={props.onChange}
        itemClass="page-item"
        linkClass="page-link"
        innerClass={`pagination pagination-sm justify-content-${props.position} mb-0 mt-3`}
        activeClass="page-item active"
        activeLinkClass="page-link"
        prevPageText="&laquo;"
        nextPageText="&raquo;"
        firstPageText="First"
        lastPageText="Last"
      />
    )
  );
}

export default definePagination;