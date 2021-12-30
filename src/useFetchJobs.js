import axios from 'axios';
import { useEffect, useReducer } from 'react';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
  UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}

const BASE_ORIGIN = 'https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api'

const options = {
  method: 'GET',  
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-host': 'arbeitnow-free-job-board.p.rapidapi.com',
    'x-rapidapi-key': 'e26ee4c239msh445692875e108d0p1da12ajsned5ac11db6f5'
  },
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        loading: true,
        jobs: [],
      }

    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs,
      }

    case ACTIONS.ERROR: 
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      }

    case ACTIONS.UPDATE_HAS_NEXT_PAGE: 
    return {
      ...state,      
      hasNextPage: action.payload.hasNextPage,      
    }

    default:
      return state;
  }
  
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { job: [], loading: true });
  const BASE_URL = BASE_ORIGIN + '?page=' + page;
  const PAGING_URL = BASE_ORIGIN + '?page=' + (page + 1);

  console.log(BASE_URL, PAGING_URL)

  useEffect(() => {
    
    dispatch({ type: ACTIONS.MAKE_REQUEST })
    
    const cancelToken1 = axios.CancelToken.source();
    axios.get(
      BASE_URL, {
        ...options,
        params: { page: page, ...params},
        cancelToken: cancelToken1.token
      }
      ).then(res => {
        // console.log(res.data.data)
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data.data } })
      }).catch(e => {
        if (axios.isCancel(e)) return
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
      })

      const cancelToken2 = axios.CancelToken.source();
      axios.get(
        PAGING_URL, {
          ...options,
          params: { page: page, ...params},
          cancelToken: cancelToken2.token
        }
        ).then(res => {
          console.log(res.data.data)
          dispatch({ 
            type: ACTIONS.UPDATE_HAS_NEXT_PAGE, 
            payload: { hasNextPage: res.data.data.length !== 0 } 
          })
        }).catch(e => {
          if (axios.isCancel(e)) return
          dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })

    return () => {
      cancelToken1.cancel()
      cancelToken2.cancel()
    }
  }, [params, page])

  return state
}
