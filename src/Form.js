import React from "react";

const FormComponent = () => {
return (
<div>
<h2>Create Product</h2>

<form>
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input type="email" className="form-control" id="email" placeholder="Enter email" />
      <small className="form-text text-muted">
        We'll never share your email with anyone else.
      </small>
    </div>

    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control" id="password" placeholder="Password" />
    </div>

    <div className="form-group form-check">
      <input type="checkbox" className="form-check-input" id="check" />
      <label className="form-check-label" htmlFor="check">Check me out</label>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>
);
};

export default FormComponent;