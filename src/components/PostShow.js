import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPost } from "../actions";
import { Link } from "react-router-dom";
const PostShow = (props) => {
  useEffect(() => {
    if (!props.post) {
      const id = props.match.params.id;
      props.getPost(id);
    }
  }, []);

  const deleteItem = () => {
    const id = props.match.params.id;
    props.deletePost(id);
  };
  if (!props.post) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to="/">Back to index</Link>
      <button onClick={deleteItem} className="btn btn-warning pull-xs-right">
        DELETE
      </button>
      <h2>{props.post.title}</h2>
      <h2>{props.post.category}</h2>
      <h2>{props.post.content}</h2>
    </div>
  );
};

const mapStateToProps = ({ posts }, ownProps) => ({
  post: posts[ownProps.match.params.id],
});

export default connect(mapStateToProps, { getPost })(PostShow);
