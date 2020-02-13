import React, {useCallback, useState} from 'react'
import ReactCrop from 'react-image-crop'
import { connect } from 'react-redux'
import 'react-image-crop/lib/ReactCrop.scss'
import { setNewProfileImage } from '../../actions/profile.js'

type Props = {
  src: string,
  setNewProfileImage: (e: any, a: any) => void,
  presignedURl: string
}

function mapStateToProps(state :any) {
  return {
    presignedURl: state.profileEdit.presigned_Url.url
   }
}

const ProfileEditImageCrop = ({ src,  setNewProfileImage, presignedURl} : Props) => {
  const [crop, setCrop] = useState({ aspect: 16 / 16, minWidth: 40, maxWidth: 40})
  const [image, setImage] = useState(null)
  const [croppedImage, setCroppedImage] = useState()

  function onCropComplete(crop: any) {
    if (image && crop.width && crop.height) {
      setCroppedImg(image, crop)
    }
  }

  async function setCroppedImg(image: any, crop: any) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    if (ctx !== null) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }
    var dataUrl = canvas.toDataURL()
    var data = dataUrl.replace(/^data:image\/\w+;base64,/, "")
    var buf = Buffer.from(data, 'base64');
    setCroppedImage(buf);
  }

  function submitNewProfileImage() {
    const formData = new FormData()
    formData.append('avatar', src)
    setNewProfileImage(presignedURl, croppedImage)
  }

  return <div>
            <ReactCrop src={src}
                        crop={crop}
                        onChange={(newCrop: any) => setCrop(newCrop)}
                        onImageLoaded={(image: any) => setImage(image)}
                        onComplete={onCropComplete} />
            <button onClick={submitNewProfileImage}> Submit </button>
         </div>
}

export default connect(mapStateToProps, {setNewProfileImage})(ProfileEditImageCrop);
