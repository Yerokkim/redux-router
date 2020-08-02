import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

const PostNew = (props, { createPost }) => {
  const renderField = (field) => {
    //원래는 field.meta.touch 하는걸 destructuring
    const {
      meta: { touched, error },
    } = field;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="help-text">
          <p>{touched ? error : ""}</p>
        </div>
      </div>
    );
  };
  const onSubmit = (values) => {
    props.createPost(values, () => {
      props.history.push("/");
    });
  };
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field label="Title" name="title" component={renderField}></Field>
      <Field label="Category" name="category" component={renderField}></Field>
      <Field label="Content" name="content" component={renderField}></Field>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <Link to="/" className="btn btn-danger">
        Cancel
      </Link>
    </form>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.title || values.title.length < 3) {
    errors.title = "Enter title at least 3";
  }

  if (!values.category || values.category.length < 3) {
    errors.category = "Enter category at least 3";
  }
  if (!values.content || values.content.length < 3) {
    errors.content = "Enter content at least 3";
  }
  return errors;
};

export default reduxForm({
  validate,
  form: "PostNewForm",
})(connect(null, { createPost })(PostNew));
