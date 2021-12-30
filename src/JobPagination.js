import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function JobPagination({ page, setPage, hasNextPage }) {
  console.log(hasNextPage)

  function switchPage(amount) {
    setPage(prevPage => prevPage + amount)
  }

  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => switchPage(-1)} />}
      {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
      {page > 2 && <Pagination.Ellipsis />}
      {page > 2 && <Pagination.Item onClick={() => switchPage(-1)}>{page - 1}</Pagination.Item>}
      <Pagination.Item active>{page}</Pagination.Item>
      {hasNextPage && <Pagination.Item onClick={() => switchPage(1)}>{page + 1}</Pagination.Item>}
      {hasNextPage && <Pagination.Next onClick={() => switchPage(1)}/>}
    </Pagination>
  )
}
