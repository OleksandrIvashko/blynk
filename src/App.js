import ListItems from "./coomponents/ListItems";

//style
import "./assets/style/style.scss";


function App() {
  return (
    <div className="App">
        <div className="layout">
            <div className="layout-sidebar">
                <h1>
                    DAYRY APP
                </h1>
                <div className="layout-sidebar-description">
                    Comment whit no sense
                </div>
            </div>
            <div className="layout-content">
                <ListItems />
            </div>
        </div>
    </div>
  );
}

export default App;
