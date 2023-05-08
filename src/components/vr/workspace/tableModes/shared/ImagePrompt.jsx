import Image from "./../../../helpers/Image";


function ImagePrompt({prompt}){

  return(<group>
    <Image file={prompt} position={[0, 0, 0]} />
  </group>)
}

export default ImagePrompt