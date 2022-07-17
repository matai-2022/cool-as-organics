import * as tmImage from '@teachablemachine/image'

export default async function predictProduct(canvas) {
  const modelData = '/products_model/model.json'
  const metaData = '/products_model/metadata.json'

  const model = await tmImage.load(modelData, metaData)

  const predictions = await model.predict(canvas)
  
  const probabilities = predictions.map(prediction => prediction.probability)
  const i = probabilities.indexOf(Math.max(...probabilities))

  const prediction = predictions[i].className
  return prediction
}