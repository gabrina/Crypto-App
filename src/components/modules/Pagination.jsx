import Styles from "./Pagination.module.css";

function Pagination({ page, setPage }) {
  const previousHandler = () => {};

  const nextHandler = () => {
    setPage((page) => page + 1);
  };
  return (
    <div className={Styles.container}>
      <button onClick={() => setPage((page) => page - 1)} disabled={page <= 1}>
        Previous
      </button>
      <p
        style={{ backgroundColor: page === 1 ? "#094b7d" : "inherit" }}
        onClick={() => {
          setPage((page) => setPage(1));
        }}
      >
        1
      </p>
      <p
        style={{ backgroundColor: page === 2 ? "#094b7d" : "inherit" }}
        onClick={() => {
          setPage((page) => setPage(2));
        }}
      >
        2
      </p>
      {page > 2 && page < 9 && (
        <>
          <span>...</span>
          <p style={{ backgroundColor: "#094b7d" }}>{page}</p>
        </>
      )}
      <span>...</span>
      <p
        style={{ backgroundColor: page === 9 ? "#094b7d" : "inherit" }}
        onClick={() => {
          setPage((page) => setPage(9));
        }}
      >
        9
      </p>
      <p
        style={{ backgroundColor: page === 10 ? "#094b7d" : "inherit" }}
        onClick={() => {
          setPage((page) => setPage(10));
        }}
      >
        10
      </p>

      <button onClick={() => setPage((page) => page + 1)} disabled={page >= 10}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
