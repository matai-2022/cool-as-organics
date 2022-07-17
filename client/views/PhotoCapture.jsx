import React, {useEffect, useReducer, useRef} from 'react'
import moment from 'moment'

import predictProduct from '../utils/predictProduct'
import { postProduct} from '../apis/products'

import Modal from '../subcomponents/Modal.jsx'
import AddProductForm from '../subcomponents/AddProductForm'

const initialState = {
  status: 'IDLE',
  product: {},
  error: ''
}

function PhotoCapture() {
  const videoRef = useRef()
  const [state, dispatch] = useReducer(reducer, initialState)

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
    if (state.status === 'IMAGE_CAPTURED') {
      // Capture an image from the camera and wrap it in a canvas element to pass to the machine learning API
      try {
        const capturedImage = await createImageBitmap(videoRef.current)
        const canvas = document.createElement('canvas')
        canvas.getContext('2d').drawImage(capturedImage, 0, 0)
        const predictedProduct = await predictProduct(canvas)

        // TODO Replace hardcoded values with database values
        const product = {
          name: predictedProduct,
          openDate: moment().format('yyyy-MM-DD'),
          lifespan: 5,
          productTypeId: 1,
          compartment: 'fridge',
        }

        // Dispatching PRODUCT_PREDICTED will display AddProductForm pre-populated with values from product object
        dispatch({type: 'PRODUCT_PREDICTED', status: 'PRODUCT_PREDICTED', payload: product })
      } catch(error) {
        console.error(error.message)
        dispatch({type: 'ERROR', status: 'ERROR', payload: error.message})
      }
    }
  })

  async function handleSubmit(values) {
    const {lifespan, ...product} = values
    product.isUsed = false

    try {
      await postProduct(product)
      dispatch({type: 'IDLE', status: 'IDLE'})
    }
    catch(error) {
      console.error(error.message)
    }
  }

  return (
    <>
    {/* scale-x-[-1] class mirrors the webcam display for a better user experience */}
    <video ref={videoRef} autoPlay className='scale-x-[-1]' />

    <button 
      onClick={() => {dispatch({type: 'IMAGE_CAPTURED', status: 'IMAGE_CAPTURED'})}}>
        Add Product
    </button>

    {/* TODO Replace this messsage with a proper loading indicator */}
    {state.status === 'IMAGE_CAPTURED' && <p>Predicting product...</p>}

    {state.status === 'ERROR' && <p>{state.error}</p>}

    {state.status === 'PRODUCT_PREDICTED' &&
    <Modal>
      <AddProductForm initialValues={state.product} handleSubmit={handleSubmit} />
    </Modal>
    }
    </>
  )
}

export default PhotoCapture

// State reducer

function reducer(state, action) {
  const actions = {}

  actions['IMAGE_CAPTURED'] = () => {
    return {...state,
      status: action.status
    }
  }

  actions['IDLE'] = () => {
    return {...state,
      status: action.status,
      product: {}
    }
  }

  actions['PRODUCT_PREDICTED'] = () => {
    return {...state,
      status: action.status,
      product: action.payload
    }
  }

  actions['ERROR'] = () => {
    return {...state,
      status: action.status,
      error: action.payload
    }
  }

  return actions[action.type]() || state
}