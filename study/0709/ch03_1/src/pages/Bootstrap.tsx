const Bootstrap = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email Address
        </label>
        <input type="email" className="form-control" id="exampleInputEmail1" />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label htmlFor="exampleCheck1" className="form-check-label">
          Check me out
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button type="submit" className="btn btn-primary">
          Submit(primary)
        </button>
        <button type="submit" className="btn btn-danger">
          Submit(danger)
        </button>
        <button type="submit" className="btn btn-warning">
          Submit(warning)
        </button>
        <button type="submit" className="btn btn-success">
          Submit(success)
        </button>
      </div>
    </form>
  );
};

export default Bootstrap;
