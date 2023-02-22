import * as React from 'react';
import {
  Routes,
  Route,
  HashRouter,
} from 'react-router-dom';
import ListForm from './List';
import Edit from './Edit';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ListForm />} />
        <Route path="/edit" element={<Edit />} />
        <Route
          path="*"
          element={(
            <main style={{ padding: '1rem' }}>
              <p>There&rsquo;s nothing here!</p>
            </main>
      )}
        />
      </Routes>
    </HashRouter>

  );
}

export default App;
