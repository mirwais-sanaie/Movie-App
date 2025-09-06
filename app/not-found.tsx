import Link from "next/link";

function notFound() {
  return (
    <div>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
            <h2>Page not found</h2>
          </div>
          <Link href="/">Homepage</Link>
        </div>
      </div>
    </div>
  );
}

export default notFound;
