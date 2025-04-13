import Navbar from './components/Navbar';
import Hero from './components/section/Hero';
import Register from './components/section/Register';

function App() {
  return (
    <div className="App overflow-hidden">
      
      
      < Navbar />
      < Hero />
      {/* Conteúdo da página */}
      <main className="pt-16">
        <h1 className="text-3xl font-bold"></h1>
      </main>
    </div>
  );
}

export default App;
