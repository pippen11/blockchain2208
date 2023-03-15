import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blocks from './components/blocks/Blocks';
import Tx from './components/transactions/Tx';
import Home from './components/Home';
import Found from './components/searchView/Found';
import NotFound from './components/searchView/NotFound';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blocks" element={<Blocks />} />
                    <Route path="/transactions" element={<Tx />} />
                    <Route path="/found" element={<Found />} />
                    <Route path="/notFound" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
