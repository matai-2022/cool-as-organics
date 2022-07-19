import * as tmImage from '@teachablemachine/image'

export async function getModel() {
  const modelURL = '/products_model/model.json'
  const metadataURL = '/products_model/metadata.json'

  return await tmImage.load(modelURL, metadataURL)
}

export async function predictProduct(model, camera) {
  // Capture an image from the camera and wrap it in a canvas element to pass to the machine learning API
  const capturedImage = await createImageBitmap(camera)
  const canvas = document.createElement('canvas')
  canvas.getContext('2d').drawImage(capturedImage, 0, 0)

  // Get all predictions from the machine learning model
  const predictions = await model.predict(canvas)

  // Return prediction with max probability
  const probabilities = predictions.map((prediction) => prediction.probability)
  const i = probabilities.indexOf(Math.max(...probabilities))
  return predictions[i].className
}
