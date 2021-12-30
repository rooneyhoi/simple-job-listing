import Interweave from 'interweave';
import React, { useState } from 'react';
import { Badge, Button, Card, Collapse } from 'react-bootstrap';

import JobType from './JobType';

export default function Job({job}) {
  const [open, setOpen] = useState(false)
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} - <span className="text-muted font-weight-light">{job.company_name}</span>
            </Card.Title>
            
            <Card.Subtitle>
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
                        
            <JobType jobTypes={job.job_types} />

            <Badge pill bg="primary">{job.location}</Badge>            
          </div>

          </div>
            <a href={job.url} target="_blank" style={{ textDecoration: 'none' }}>{job.url}</a>
          <div>

        </div>

        <Card.Text>
          <Button 
            onClick={() => setOpen(prevOpen => !prevOpen)} 
            variant="primary">
              {open ? 'Hide Details' : 'View Details'}
          </Button>
        </Card.Text>

        <Collapse in={open}>          
          <div className="mt-4">
            <Interweave content={job.description} />            
          </div>
        </Collapse>

      </Card.Body>
    </Card>
    
    
    
  )
}
