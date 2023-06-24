import { useEffect, useState } from 'react'

const MemeGenerator = () => {
    const [memeData, setMemeData] = useState([])
    const [formData, setFormData] = useState({
        topText: "",
        bottomText: "",
        memeUrl: "http://i.imgflip.com/1bij.jpg"
    })


    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(result => setMemeData(result.data.memes))
            .catch(error => console.log("Error occured: ", error))

        return () => setMemeData([])
    }, [])


    function handleChange(e) {
        setFormData(() => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
        )
    }

    function handleSubmit(e) {
        e.preventDefault()
        const selectedIndex = Math.floor(Math.random() * memeData.length);
        const url = memeData[selectedIndex].url;
        setFormData((prevFormData) => (
            {
                ...prevFormData,
                memeUrl: url
            }
        )
        )
    }

    return (
        <main className='m-auto px-4 md:px-[5rem]'>
            <div className="form">
                <div className="flex flex-col my-[4rem] gap-4 md:grid md:grid-cols-2 ">
                    <div>
                        <label htmlFor="topText" className="block text-gray-700 text-sm font-bold">Top Text</label>
                        <input
                            type="text"
                            id="topText"
                            name="topText"
                            placeholder='Top text'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            onChange={handleChange}
                            value={formData.topText}
                        />
                    </div>

                    <div>
                        <label htmlFor="bottomText" className="block text-gray-700 text-sm font-bold">Bottom Text</label>
                        <input
                            type="text"
                            name="bottomText"
                            placeholder='Bottom text'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            onChange={handleChange}
                            value={formData.bottomText}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className='bg-[#A626D3] text-white font-semibold p-3 w-full rounded'
                >Get a new meme image</button>
            </div>

            <div className="meme-image text-center relative my-9">
                <hr />
                <p className="top-text absolute top-[2rem] left-[10vw] md:left-[25vw] break-all text-center p-auto text-white md:text-[2rem] font-bold outline-black">{formData.topText.toUpperCase()}</p>
                <img src={formData.memeUrl} alt="random-meme" className='mx-auto my-5' />
                <p className="bottom-text absolute bottom-[2rem] left-[10vw] md:left-[25vw] break-all text-center p-auto text-white md:text-[2rem] font-bold outline-black">{formData.bottomText.toUpperCase()}</p>
            </div>

        </main>
    )
}

export default MemeGenerator