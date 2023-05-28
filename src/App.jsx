import { useState } from 'react'

function App() {
  // Declarations for our song values
  // let song;
  let playSong;
  // const [song, setSong] = useState();
  const [pause, setPause] = useState(true);

  // Spotify client creds
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const _getToken = async () => {
      const result = await fetch(`https://accounts.spotify.com/api/token`, {
          method : 'POST',
          headers : {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
          },
          body : 'grant_type=client_credentials'
      });

      const data = await result.json();
      return data.access_token;
  }

  // Function to get song info when the image is clicked
  async function clickedEvent(img_index, item_index) {
      // get track name
      let track = document.getElementsByTagName('img')[img_index].attributes[1].value;

      console.log(track);

      // get token
      let token = await _getToken();

      let headers = new Headers([
          ['Content-Type', 'application/json'],
          ['Accept', 'application/json'],
          ['Authorization', `Bearer ${token}`]
      ]);

      let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
          method : 'GET',
          headers : headers
      });

      let result = await fetch(request);

      let response = await result.json();

      console.log(response);
      let song_url = response.tracks.items[item_index].preview_url;

      // Check if song is playing and stop it
      if(playSong) {
          stopSnippet();
      }

      songSnippet(song_url);
  }

  function getSong(id, event) {
      event.stopPropagation();

      switch(id) {
          case 'fig1': {
              event.stopPropagation();
              clickedEvent(0,0);
              break;
          }
          case 'fig2': {
              event.stopPropagation();
              clickedEvent(1,0);
              break;
          }
          case 'fig3': {
              event.stopPropagation();
              clickedEvent(2,0);
              break;
          }
          case 'fig4': {
              event.stopPropagation();
              clickedEvent(3,0);
              break;
          }
          case 'fig5': {
              event.stopPropagation();
              clickedEvent(4,0);
              break;
          }
          case 'fig6': {
              event.stopPropagation();
              clickedEvent(5,0);
              break;
          }

      }
  }

  function songSnippet(url) {
      playSong = new Audio(url);
      playSong.volume = 0.1;
      return playSong.play();
  }

  // Pause the current song
  function stopSnippet() {
    return playSong.pause();
  }

  return (
    <>
      <div className="container">
        <div className="gallery">
            <figure className="gallery__item gallery__item--1" id="fig1" onClick={(e) => getSong('fig1', e)}>
                <img src="src/assets/faded_cover.jfif" alt="Faded Alan Walker" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--2" id="fig2" onClick={(e) => getSong('fig2', e)}>
                <img src="src/assets/cracker_island_cover.jpg" alt="Cracker Island Gorillaz" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--3" id="fig3" onClick={(e) => getSong('fig3', e)}>
                <img src="src/assets/feed_the_dada.jpg" alt="Feed the Dada Dada Life" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--4" id="fig4" onClick={(e) => getSong('fig4', e)}>
                <img src="src/assets/mange_kommer_hem_till_dig.jpg" alt="Mange kommer hem till dig Mange Maker" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--5" id="fig5" onClick={(e) => getSong('fig5', e)}>
                <img src="src/assets/rolling_in_the_deep.png" alt="Rolling in the Deep Adele" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--6" id="fig6" onClick={(e) => getSong('fig6', e)}>
                <img src="src/assets/little_talks_cover.jpg" alt="Little Talks Of Monseters and Men" className="gallery__img" />
            </figure>
        </div>
        <div className="buttoncontain">
            <button onClick={stopSnippet}>Stop Song</button>
        </div>
      </div>
    </>
  )
}

export default App
