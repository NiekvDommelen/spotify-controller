import React, { useState, useEffect} from 'react';
import './App.css';
import spotify from './spotify.js'

const song = new spotify()

function App() {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [id, setid] = useState(0);
  const [name, setName] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing , setPlaying] = useState(0);
  const [playingIco , setPlayingIco] = useState(0);
  const [artist , setArtist] = useState(0);
  

    




  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateSong(){
    song.update()
    let id = song.id;
    let name = song.name;
    let progress = song.progress;
    let duration = song.duration;
    let playing = song.playing;
    let artist = song.artist;
    const playingIco = playing ? "||" : "▶";
    setPlaying(playing)
    setPlayingIco(playingIco)
    setProgress(progress)
    setName(name)
    setDuration(duration)
    setid(id)
    setArtist(artist);
    
    
    if(!dragging){
      document.getElementsByClassName("progressBar")[0].value = progress;
    }
    
  }
 
  

  useEffect(() => {
    // Call updateProgress initially
    updateSong();

    // Set up an interval to update the progress every 100 milliseconds
    const intervalId = setInterval(updateSong, 100);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dragging, updateSong]);

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>{name}</h1>
        <h2>{artist}</h2>
        <div className='actions'>
          <h2 className='action' onClick={() => {song.previous()}}>▼</h2>
          <h2 className='action' onClick={() => {song.play_pause(playing)}}>{playingIco}</h2>
          <h2 className='action' onClick={() => {song.next()}}>▲</h2>
          </div>
        <p>
          {progress}  <input type='range' onMouseDown={() => {setDragging(true);}} onMouseUp={(e) => {song.seek(e.target.value); setDragging(false);}} min={0} max={duration} className='progressBar'></input>  {duration}
        </p>
        
        
        <br/>
        <p>{id}</p>
        
      </header>
      
       
    </div>
    
  );

  
}

export default App;
