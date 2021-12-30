import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

import Job from './Job';
import JobPagination from './JobPagination';
import useFetchJobs from './useFetchJobs';


function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)
  
  return (
    <Container className="my-4">
      <h1 className="mb-4">Arbeit Now Jobs</h1>

      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage}></JobPagination>

      { loading && <h1>Loading...</h1> }

      { error && <h1>Error. Try refreshing</h1> }

      { jobs? 
        jobs.map(job => {
          return <Job key={nanoid()} job={job} />
          // can use job.slug as key          
        })
       : '0'}

      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage}></JobPagination>
    </Container>
  );
}

export default App;
