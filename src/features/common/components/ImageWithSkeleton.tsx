import { useState, type DetailedHTMLProps, type ImgHTMLAttributes } from 'react'

interface ImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  aspectRatio: string
}
export const ImageWithSkeleton = ({ aspectRatio, ...props }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <>
      <div
        hidden={isLoaded}
        className={`flex items-center justify-center bg-neutral-400 rounded-base animate-pulse ${aspectRatio}`}
      />

      <img
        hidden={isLoaded === false}
        className={`object-cover w-full transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${aspectRatio}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        {...props}
      />
    </>
  )
}
