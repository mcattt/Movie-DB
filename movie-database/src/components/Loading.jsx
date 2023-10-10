import loading from '/assets/gifs/clip-loading.gif';

const Loading = () => {
    
    return (
        <div className='absolute top-[40%] left-0 right-0'>
            <img src={loading} alt="Loading" className="block my-0 mx-auto w-[48px]" id="loading" />
        </div>
    )

}

export default Loading
