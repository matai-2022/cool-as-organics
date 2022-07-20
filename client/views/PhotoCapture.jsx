import React, {useEffect, useReducer, useRef} from 'react'
import moment from 'moment'

import {getModel, predictProduct} from '../utils/PhotoCaptureHelper'
import { postProduct} from '../apis/products'
import { getProductDefaultsByName } from '../apis/productDefaults'

import Modal from '../subcomponents/Modal.jsx'
import AddProductForm from '../subcomponents/AddProductForm.jsx'
import Conditional from '../subcomponents/Conditional.jsx'

const initialState = {
  status: 'LOADING',
  model: null,
  product: {},
  error: ''
}

function PhotoCapture() {
  const videoRef = useRef()
  const [state, dispatch] = useReducer(reducer, initialState)

  // Run once on startup
  useEffect(async () => {
    // Load the device camera stream and assign it to the video element
    // Load machine learning model
    Promise.all([
      navigator.mediaDevices.getUserMedia({
        audio: false, video: {facingMode: 'environment', aspectRatio: 1}}),
      getModel()
    ]).then(values => {
      videoRef.current.srcObject = values[0]
      dispatch({type: 'LOADED', status: 'IDLE', payload: values[1]})
    }).catch((error) => {
      dispatch({type: 'ERROR', status: 'ERROR', payload: error.message})
      console.error(error.message)
    })
  }, [])

  // Run only when image is captured
  useEffect(async () => {
    if (state.status === 'IMAGE_CAPTURED') {
      try {
        // Get the best guess
        const predictedProduct = await predictProduct(state.model, videoRef.current)

        // Look up product defaults
        const product = await getProductDefaultsByName(predictedProduct)
        product.openDate = moment().format('yyyy-MM-DD')
        
        // Display AddProductForm pre-populated with product defaults
        dispatch({type: 'PRODUCT_PREDICTED', status: 'PRODUCT_PREDICTED', payload: product })
      } catch(error) {
        console.error(error.message)
        dispatch({type: 'ERROR', status: 'ERROR', payload: error.message})
      }
    }
  })

  // Form handler
  async function handleSubmit(values) {
    const {lifespan, ...product} = values

    try {
      await postProduct(product)
      dispatch({type: 'IDLE', status: 'IDLE'})
    }
    catch(error) {
      console.error(error.message)
    }
  }

  return (
  <div className='h-screen flex flex-col items-center bg-black'>
    {/* Camera */}
    {/* scale-x-[-1] class mirrors the camera display for a better user experience */}
    <video ref={videoRef} autoPlay className='scale-x-[-1]' />

    <Conditional condition={state.status !== 'LOADING'}>
      {/* Shutter button */}
      <div className='w-20 h-20 rounded-full bg-black border-white border-4 mt-4 flex justify-center items-center'>
        <button 
          className='w-16 h-16 rounded-full bg-white text-white'
          onClick={() => {dispatch({type: 'IMAGE_CAPTURED', status: 'IMAGE_CAPTURED'})}}>
            Scan
        </button>
      </div>
    </Conditional>

    {/* Wait indicator for scanning */}
    <Conditional condition={state.status === 'IMAGE_CAPTURED'}>
      <p className='text-white mt-4'>Scanning...</p>
    </Conditional>

    {/* Error message */}
    <Conditional condition={state.status === 'ERROR'}>
      <p className='text-white mt-4'>{state.error}</p>
    </Conditional>

    {/* Add product form */}
    {/* Form displays after scanning is complete */}
    <Conditional condition={state.status === 'PRODUCT_PREDICTED'}>
      <Modal>
        <div className='h-full w-full flex flex-col bg-white'>
          <button className='self-end mt-4 mr-4 rotate-45 text-2xl'
                  onClick={() => {dispatch({type: 'IDLE', status: 'IDLE'})}}>
                  +</button>
          <AddProductForm initialValues={state.product} handleSubmit={handleSubmit} />
        </div>
      </Modal>
    </Conditional>

  </div>
  )
}

export default PhotoCapture

// State reducer

function reducer(state, action) {
  const actions = {}

  actions['LOADED'] = () => {
    return {...state,
    status: action.status,
    model: action.payload
    }
  }

  actions['IDLE'] = () => {
    return {...state,
      status: action.status,
      product: {}
    }
  }

  actions['IMAGE_CAPTURED'] = () => {
    return {...state,
      status: action.status
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