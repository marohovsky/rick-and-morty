
import { useState } from 'react';
import { AliveOrDead } from '../alive-or-dead/AliveOrDead';
import { AppHeader } from '../app-header/AppHeader';
import { CharInfo } from '../char-info/CharInfo';
import { CharList } from '../char-list/CharList';

import '../../style/buttons.scss'
import './app.scss';



function App() {
  const [selectedChar, setSelectedChar] = useState(null)
  const onCharSelected = (id) =>{
    setSelectedChar(id);
  }
  return (
    <div className="App">
      <AppHeader/>
      <AliveOrDead/>
      <div className='main'>
        <CharList onCharSelected={onCharSelected} selectedChar={selectedChar}/>
        <CharInfo selectedChar={selectedChar}/>
      </div>
    </div>
  );
}

export default App;
