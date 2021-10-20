import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import { getPosts } from "../../actions/posts.js";
import { useDispatch } from "react-redux";

const Home = () => {
      // useState(null) stats with null if there is no id.
  const [currentId, setCurrentId] = useState(null);
  // const classes = useStyles();
  const dispatch = useDispatch();

  // useEffect will dispatch getPosts when currentID changes, or when any function is dispatched.
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

    return (
        <Grow in>
        <Container>
          <Grid
            // className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} md={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home
