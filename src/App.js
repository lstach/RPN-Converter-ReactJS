import AboutRPN from "./components/AboutRPN";
import Footer from "./components/Footer";
import FormulaEntry from "./components/FormulaEntry";
import Header from "./components/Header";
import Result from "./components/Result";
import Modal from "./components/Modal";



function App() {
  return (
    <div style={{backgroundColor: 'white', height: '100vh', position: "absolute", overflow: "hidden", width: "100%"}}>
      <div style={{border: '1px solid black', background: "ghostwhite", marginLeft: '10px', marginRight: '10px', marginTop: "10px", paddingBottom: "25px"}}>
        <Header></Header>
        <FormulaEntry></FormulaEntry>
      </div>
      <Result></Result>
      <AboutRPN></AboutRPN>
      <Footer></Footer>
    </div>
  );
}

export default App;