import {useState, useEffect} from "react"

export default function Meme() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/23ls.jpg"
    })

    const[allMemes, setAllMemes] = useState([])

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({...prevMeme, randomImage: url}))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({...prevMeme, [name]: value}))
    }

    return (
        <main>
            <div className="form">
                <input type="text" name="topText" className="form-input" placeholder="Top Text" value={meme.topText} onChange={handleChange} />
                <input type="text" name="bottomText" className="form-input" placeholder="Bottom Text" value={meme.bottomText} onChange={handleChange} />
                
            </div>

            <div>
                <button onClick={getMemeImage} className="form-button">Get a new meme image</button>
            </div>

            <br />
            <div className="meme">
                <img src={meme.randomImage} className="meme-image" alt="error" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}