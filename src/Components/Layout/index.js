import Header from "./Header";

const App = ({ children }) => (
  <div className="layout h-screen">
    <Header />
    <div>{children}</div>
  </div>
);
export default App;
