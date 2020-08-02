import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPost } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";

const PostIndex = ({ fetchPost, posts }) => {
  useEffect(() => {
    fetchPost();
  }, []);

  const renderPost = () => {
    return _.map(posts, (x) => {
      return (
        <li key={x.id} className="list-group-item">
          <Link to={`/posts/${x.id}`}> {x.title}</Link>
        </li>
      );
    });
  };

  return (
    <div>
      <div className="text-xs-right">
        <Link to="/posts/new" className="btn btn-primary">
          Add post
        </Link>
      </div>
      <ul className="list-group">{renderPost()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});
export default connect(mapStateToProps, { fetchPost })(PostIndex);
