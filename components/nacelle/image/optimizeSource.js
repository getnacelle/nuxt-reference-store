const sanitizeUrl = ({ url }) => {
  const src = url.split('&')[0]
  return src.split('//')[0] !== 'https:' ? `https://${src.split('//')[1]}` : src
}

const getCDN = ({ url }) => {
  if (!url || typeof url !== 'string') {
    throw new Error('Could not establish origin CDN from image source')
  }
  if (url.includes('cdn.shopify')) {
    return 'shopify'
  } else if (url.includes('ctfassets.net')) {
    return 'contentful'
  }
  return 'unknown'
}

const roundedUpToNearest50px = (x) => {
  if (x >= 50) {
    return +x + 49 - ((+x + 49) % 50)
  }
}

const resizeImage = ({
  originCDN,
  src,
  width = null,
  height = null,
  crop = false,
  cropDirection
} = {}) => {
  if (originCDN === 'contentful') {
    return contentfulResize({ src, width, height, crop })
  } else if (originCDN === 'shopify') {
    return shopifyResize({ src, width, height, crop, cropDirection })
  } else if (originCDN === 'unknown') {
    return src
  }
}

const reformatSrc = ({ originCDN, src, format }) => {
  try {
    if (originCDN === 'shopify') {
      return shopifyReformat({ src, format })
    } else if (originCDN === 'contentful') {
      return contentfulReformat({ src, format })
    } else if (originCDN === 'unknown') {
      return src
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      'Invalid image transformation.\n' +
        `Cannot transform ${src} to format: "${format}"`
    )
  }
}

/**
 * Returns a query string for an image in the requested dimensions.
 *
 * NOTE: Rounds up size to the nearest 50px increment.
 *
 * @param {Object} options - Configuration options
 * @param {string} options.src - The image `src`
 * @param {string} options.width - The desired output width, in pixels
 * @param {string} options.height - The desired output height, in pixels
 * @param {boolean} options.crop - Whether or not to crop the image
 */
const shopifyResize = ({
  src = null,
  width = null,
  height = null,
  crop = false,
  cropDirection = 'center'
} = {}) => {
  const getSizeString = () => {
    if (width && height) {
      return `_${width}x${height}`
    } else if (width && !height) {
      return crop
        ? `_${width}x${roundedUpToNearest50px((width / 3) * 4)}`
        : `_${width}x`
    } else if (!width && height) {
      return `_x${height}`
    } else {
      return ''
    }
  }
  if (typeof src === 'string') {
    const [baseWithExt, args] = src.split('?')
    const [extension] = Array.from(baseWithExt.split('.')).reverse()
    const [base] = baseWithExt.split(`.${extension}`)
    const newSizeString = getSizeString()
    const cropString = crop ? `_crop_${cropDirection}` : ''
    const newBase = base.concat(newSizeString, cropString)
    const newArgs = args
      ? args.split('&').filter((el) => el.includes('width=') === false)
      : []
    const newSrc = newBase.concat(`.${extension}?${newArgs.join('&')}`)
    return newSrc
  }
  return null
}

/**
 * Takes either a png or jpg (other formats will not work),
 * Returns query string for image in WebP or PJPG format.
 *
 * NOTE: Transformation only works on png and jpg images.
 *
 * @param {Object} options - Configuration options
 * @param {string} options.src - The image `src`
 * @param {string} options.format - The desired output format
 *
 * @example
 * // returns: "https://cdn.shopify.com/s/files/myPicture.png&format=pjpg"
 * shopifyReformat({ src: "https://cdn.shopify.com/s/files/myPicture.png", format: 'pjpg'})
 *
 * @example
 * // returns: "https://cdn.shopify.com/s/files/myPicture.jpg&format=webp"
 * shopifyReformat({ src: "https://cdn.shopify.com/s/files/myPicture.jpg", format: 'webp'})
 */
const shopifyReformat = ({ src, format }) => {
  if (typeof src === 'string') {
    const extension = Array.from(src.split('?v=')[0].split('.')).pop()
    if (extension === 'png' || extension === 'jpg') {
      return src
        .split('&format=')[0]
        .concat(`&format=${format === 'auto' ? 'jpg' : format}`)
    } else {
      // return the original image if it is a gif / not a png or jpg
      return src
    }
  } else {
    return null
  }
}

const contentfulSplitUrl = ({ src = null }) => {
  const [baseWithExt, args] = src.split('?')
  const [extension] = Array.from(baseWithExt.split('.')).reverse()
  const [base] = baseWithExt.split(`.${extension}`)
  return [base, args, extension]
}
const contentfulResize = ({
  src = null,
  width = null,
  height = null,
  crop = false
} = {}) => {
  function getSizeString() {
    if (width && height) {
      return `w=${width}&h=${height}`
    } else if (width && !height) {
      return `w=${width}`
    } else if (!width && height) {
      return `h=${height}`
    } else {
      return new Error('No image size specified')
    }
  }
  if (typeof src === 'string') {
    const [base, args, extension] = contentfulSplitUrl({ src })
    const sizeString = getSizeString()
    const cropString = crop ? `&fit=crop&f=${crop}` : ''
    const newArgs = args
      ? args
          .split('&')
          .filter((el) => el.includes('width=') === false)
          .join('&')
          .concat(`&${sizeString}`)
      : sizeString + cropString
    const newSrc = newArgs
      ? base.concat(`.${extension}?${newArgs}`)
      : base.concat(`.${extension}`)
    return newSrc
  }
  return null
}

/**
 * Takes an image stored in Contentful and returns a query string
 * or image in the requested format.
 *
 * @param {Object} options - Configuration options
 * @param {string} options.src - The image `src`
 * @param {string} options.format - The desired output format ('webp' , 'pjpg' , etc.)
 */
const contentfulReformat = ({ src = null, format = 'webp' } = {}) => {
  if (typeof src === 'string') {
    const [base, args, extension] = contentfulSplitUrl({ src })
    const imgFormat = format === 'jpeg' ? 'jpg' : format
    if (imgFormat !== extension) {
      const newArgs = args
        ? args
            .split('&')
            .filter((el) => el.includes('fl=') === false)
            .filter((el) => el.includes('fm=') === false)
            .join('&')
        : ''
      if (imgFormat === 'png' || imgFormat === 'jpg' || imgFormat === 'webp') {
        return `${base}.${extension}?${newArgs}&fm=${imgFormat}`
      } else if (imgFormat === 'pjpg') {
        return `${base}.${extension}?${newArgs}&fm=jpg&fl=progressive`
      }
    } else {
      // return the original image if not being converted to a possible extension
      return src
    }
  } else {
    return null
  }
}

export default ({
  url = null,
  format = 'auto',
  width = null,
  height = null,
  crop = false,
  cropDirection
} = {}) => {
  if (typeof url !== 'string') {
    throw new TypeError(
      `Image src must be a string; Received type: ${typeof url}\nReceived: ${JSON.stringify(
        url
      )}`
    )
  }
  const sanitizedUrl = sanitizeUrl({ url })
  const originCDN = getCDN({ url: sanitizedUrl })
  const reformattedSrc = reformatSrc({ originCDN, src: sanitizedUrl, format })

  if (!width && !height) {
    return reformattedSrc
  } else {
    return resizeImage({
      originCDN,
      src: reformattedSrc,
      width: roundedUpToNearest50px(width),
      height: roundedUpToNearest50px(height),
      crop,
      cropDirection
    })
  }
}
