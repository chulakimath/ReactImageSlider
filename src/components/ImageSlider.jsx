import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';



const ImageSlider = ({ url, limit = 5, page = 1 }) => {
    const [images, setImages] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoding, setIsLoading] = useState(false);
    const fetchImages = async (imageUrl, limit) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${imageUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();
            if (data) {
                setImages(data);
                setIsLoading(false);
                console.log(data);
            }
        } catch (e) {
            setErrorMsg(e.message);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (url !== '') {
            fetchImages(url, limit)
        }
    }, [url]);

    useEffect(() => {
        const autoincr = setInterval(rightHandler, 8000);
        return () => clearInterval(autoincr);
    }, [images]);

    if (isLoding) {
        return (<div className='text-3xl text-blue-500 bg-slate-100 p-4 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>Loading...</div>)
    }
    if (errorMsg) {
        return (<div className='text-3xl text-red-400 bg-slate-200 p-4 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>some error has occoured</div>)
    }

    const leftHandler = () => {
        setCurrentSlide(prev => prev === 0 ? images.length - 1 : prev - 1)
    }
    const rightHandler = () => {
        setCurrentSlide(prev => prev === images.length - 1 ? 0 : prev + 1)
    }
    return (
        <>
            <div className='p-2 bg-yellow-200 flex justify-center relative items-center transition-all duration-300'>
                <div className='flex relative transition-all duration-300'>
                    <BsArrowLeftCircleFill
                        className='absolute top-[50%] -translate-y-[50%] left-4 cursor-pointer hover:scale-150 transition-transform delay-100'
                        size="30px"
                        color='white'
                        onClick={leftHandler} />
                    {
                        images && images.length > 0 ? images.map(item => (
                            <img
                                key={item.id}
                                src={item.download_url}
                                alt={item.download_url}
                                hidden={item.id == currentSlide ? false : true}
                                className='w-[450px] h-full  border-[0.5rem] shadow-md shadow-black transition-all duration-200'
                            />
                        )) : null
                    }
                    <BsArrowRightCircleFill
                        className='absolute top-[50%] -translate-y-[50%] right-4 cursor-pointer hover:scale-150 transition-transform delay-100'
                        size='30px'
                        color='white'
                        onClick={rightHandler}
                        
                    />
                </div>
                <span className='absolute z-0 bottom-[7%]'>
                    {images && images.length > 0 ?
                        images.map((_, index) => (
                            <button key={index} className={`${currentSlide === index ? "bg-white p-3" : "bg-gray-400"} rounded-full p-2 m-1 `}></button>
                        ))
                        : null}
                </span>
            </div>
        </>
    )
}

export default ImageSlider