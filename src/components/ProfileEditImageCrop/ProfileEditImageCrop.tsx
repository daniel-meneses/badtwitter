import React, {useCallback, useState} from 'react'
import ReactCrop from 'react-image-crop'
import './ProfileEditImageCrop.scss'
import { connect } from 'react-redux'
import 'react-image-crop/lib/ReactCrop.scss'
import { postImageToPresignedURL } from '../../actions/profile.js'

type Props = {
  src: string,
  postImageToPresignedURL: (e: string, a: any) => void,
  presignedURL: string,
  avatar: string
}

function mapStateToProps(state :any) {
  return {
    presignedURL: state.profileEdit.presigned_Url.url,
    avatar: state.profileEdit.avatar
   }
}

const ProfileEditImageCrop = ({ src,  postImageToPresignedURL, presignedURL, avatar} : Props) => {
  const [crop, setCrop] = useState({ aspect: 1 / 1, minWidth: 600, maxWidth: 2600})
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
    postImageToPresignedURL(presignedURL, croppedImage)
  }

  return <div>
            <ReactCrop src={src}
                        crop={crop}
                        onChange={(newCrop: any) => setCrop(newCrop)}
                        onImageLoaded={(image: any) => setImage(image)}
                        onComplete={onCropComplete} />
            <button className='edit_pic_save' onClick={submitNewProfileImage}> Save </button>
         </div>
}

export default connect(mapStateToProps, {postImageToPresignedURL})(ProfileEditImageCrop);
