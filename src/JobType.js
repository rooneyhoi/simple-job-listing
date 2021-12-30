import { nanoid } from 'nanoid';
import React from 'react';
import { Badge } from 'react-bootstrap';

export default function JobType({jobTypes}) {
  return (
    <div>
      {jobTypes?.map(type => {
        return <span key={nanoid()} >
          <Badge pill bg="secondary" className="mr-2">{type}</Badge>{' '}
        </span>
      })}
    </div>
  )
}
