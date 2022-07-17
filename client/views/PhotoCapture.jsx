import React, {useEffect, useState, useRef} from 'react'

import predictProduct from '../utils/predictProduct'

function PhotoCapture() {
  const videoRef = useRef()
  const [prediction, setPrediction] = useState('')
  const [waiting, setWaiting] = useState(false)

  useEffect(async () => {
    // Load the device camera stream and assign it to the video element
    videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
     audio: false, 
     video: {
      facingMode: 'environment',
      width: 240,
      height: 240
     }
    })
  }, [])

  useEffect(async () => {
    if (waiting) {
      // Capture an image from the camera and wrap it in a canvas element to pass to the tmImage API
      const capturedImage = await createImageBitmap(videoRef.current)
      const canvas = document.createElement('canvas')
      canvas.getContext('2d').drawImage(capturedImage, 0, 0)
      setPrediction(await predictProduct(canvas))
      setWaiting(false)
    }
  })

  async function handleClick() {
    setWaiting(true)
  }

  return (
    <>
    {/* scale-x-[-1] class mirrors the webcam display for a better user experience */}
    <video ref={videoRef} autoPlay className='scale-x-[-1]' />
    <button onClick={handleClick}>Capture</button>
    {waiting ? <p>Predicting product...</p> : <p>{prediction}</p>}
    </>
  )
}

export default PhotoCapture