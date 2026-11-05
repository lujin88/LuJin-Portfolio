import {notFound} from 'next/navigation'
import {Concept} from './Concept'

export default async function Page({params}:{params:Promise<{variation:string}>}) {
  const {variation} = await params
  if (variation !== 'driver' && variation !== 'matrix' && variation !== 'review') notFound()
  return <Concept variation={variation}/>
}
