import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";


import useStyles from "./styles";

const Form = ( { currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))

  // useEffect populates the form with the current post data.  [] is the dependency array-- when post changes, run ueEffect.
  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  // handleSubmit function looks for a current id.  if present, will dispatch update post.  otherwise, creates a new post.
  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    } else{
      dispatch(createPost( {...postData, name: user?.result?.name} ));
    }
    clear();
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please sign in to post.
          </Typography>
      </Paper>
    )
  }



  // onClick function for CLEAR button (created below) on e memory form.  sets currentId to null, all fields tp empty strings.
  const clear = () => {
    setCurrentId(null);
    setPostData({ 
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        {/* ternary operator-- if current id, show 'Edit', otherwise 'Create' on the .. a Memory form  */}
        <Typography variant="h6">{currentId ? 'Edit' : 'Create' } a Post </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
   
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          // primary color defined by "@material-ui/core
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          // secondary color defined by "@material-ui/core
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
