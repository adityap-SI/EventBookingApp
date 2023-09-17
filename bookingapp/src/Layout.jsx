import { Link, Outlet } from "react-router-dom";

let Layout = () => {
    return <div><nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">Sportz Interactive</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page"><Link to="/">Home</Link></a>
        </div>
      </div>
    </div>
  </nav>
  <Outlet/>
  </div>

}

export default Layout;