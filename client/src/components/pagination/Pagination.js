import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getQuotes } from '../../redux/action/quotes';
import useStyles from './styles';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.quotes);
  

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getQuotes(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/quotes?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;