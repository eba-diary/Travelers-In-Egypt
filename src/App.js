import './App.css';
import Landing from './Landing';
import Banner from './global_components/Banner';
import Footer from './global_components/Footer';

function App() {
  return (
    <div>
      <header>
        <Banner />
      </header>
      <body>
        <Landing />
      </body>
      <footer>
        <Footer />
      </footer>
      

    </div>
  );
}

export default App;
