import { useState, useEffect } from 'react'
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import './App.css'

type Quote = {
    "_id": string,
    "content": string,
    "author": string,
    "tags": string[],
    "authorSlug": string,
    "length": number,
    "dateAdded": string,
    "dateModified": string,
}

const transition = "transition: all 1s";
function App() {
    const  getQuote = () => {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                return data? setQuote(data) : {}
            });
        setRandomColor(getRandomColor())
    }

    const getRandomColor = ():string => {
        const red = Math.floor(Math.random() * 128);
        const green = Math.floor(Math.random() * 128);
        const blue = Math.floor(Math.random() * 128);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    const [quote, setQuote] = useState<Quote|null>(null)
    const [randomColor, setRandomColor] = useState<string>(getRandomColor())

    useEffect(() => {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                setQuote(data)
            })
    }, []);

    return (
    <div className="container" style={{backgroundColor: randomColor, transition}}>
      <div id="quote-box">
          <div className="quoteContent">
              <h2 id="text" style={{color: randomColor}}>
                  <FaQuoteLeft size="30" style={{marginRight: "10px"}}/>
                  {quote?.content}
                  <FaQuoteRight size="30" style={{marginLeft: "10px"}}/>
              </h2>
              <h4 id="author" style={{color: randomColor}}>{quote?.author}</h4>
          </div>
          <div className="buttonContainer">
              <button id="new-quote" style={{backgroundColor: randomColor, transition}} onClick={getQuote}>New quote</button>
              <a id="tweet-quote"
                 target="_blank"
                 href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote?.content}`}
                 style={{backgroundColor: randomColor, marginRight: "10px", transition}}>
                  <FaTwitter color="white"/>
              </a>
          </div>
      </div>
    </div>
)
}

export default App
