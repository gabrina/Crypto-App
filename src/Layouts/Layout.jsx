import Styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header>
        <h1>Crypto app</h1>
        <h3>A practical practice on actual data</h3>
      </header>
      {children}
      <footer>
        <p>developed by Gabrina</p>
      </footer>
    </>
  );
}

export default Layout;
