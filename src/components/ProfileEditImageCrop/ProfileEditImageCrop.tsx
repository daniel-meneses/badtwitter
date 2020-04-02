import React, {useState} from 'react'
import ReactCrop from 'react-image-crop'
import './ProfileEditImageCrop.scss'
import { connect } from 'react-redux'
import 'react-image-crop/lib/ReactCrop.scss'

type Props = {
  src: string,
  presignedURL: string,
  avatar: string,
  handleSubmit: (presignedURL: any, croppedImage: any) => void
}

function mapStateToProps(state :any) {
  return {
    presignedURL: state.profileEdit.presigned_Url.url,
    avatar: state.profileEdit.avatar
   }
}

const ProfileEditImageCrop = ({ src, presignedURL, avatar, handleSubmit} : Props) => {
  const [crop, setCrop] = useState({aspect: 1/1, minWidth: 200, height: 300, width: 300})
  const [image, setImage] = useState()
  const [croppedImage, setCroppedImage] = useState<Buffer>()

  var style = {}
  if (image !== undefined) {
      style = {height: image!["height"],
               width: image!["width"]}
  }

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
    handleSubmit(presignedURL, croppedImage)
  }

  return <div id='uploaded_image'>
            <div>
                <ReactCrop src={src}
                            style={style}
                            crop={crop}
                            keepSelection={true}
                            onChange={(newCrop: any) => setCrop(newCrop)}
                            onImageLoaded={(image: any) => setImage(image)}
                            onComplete={onCropComplete} />
            </div>
            <button className='edit_pic_save' onClick={submitNewProfileImage}> Save </button>
         </div>
}

export default connect(mapStateToProps, {})(ProfileEditImageCrop);
