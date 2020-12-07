import React, {useState} from 'react'
import ReactCrop from 'react-image-crop'
import './ProfileEditImageCrop.mod.scss'
import { connect } from 'react-redux'
import 'react-image-crop/lib/ReactCrop.scss'
import styles from './ProfileEditImageCrop.mod.scss';
import Button, { BtnThemes} from '../../common/components/Button/Button'

type Props = {
  src: string,
  preSignedURL: string,
  handleSubmit: (preSignedURL: any, croppedImage: any) => void
}

function mapStateToProps(state :any) {
  return {
    preSignedURL: state.account.account.preSignedURL,
   }
}

const ProfileEditImageCrop = ({ src, preSignedURL, handleSubmit} : Props) => {
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
    handleSubmit(preSignedURL, croppedImage)
  }

  return <div className={styles.editImageContainer}>
                <ReactCrop src={src}
                            style={{maxWidth: 'inherit', maxHeight: 'inherit', display: 'flex', justifyContent: 'center'}}
                            crop={crop}
                            keepSelection={true}
                            onChange={(newCrop: any) => setCrop(newCrop)}
                            onImageLoaded={(image: any) => setImage(image)}
                            onComplete={onCropComplete} />
            <Button
                className={styles.saveButton}
                theme={BtnThemes.PrimaryFill}
                onClick={submitNewProfileImage}
                isDisabled={croppedImage ? false : true}
              >
                {'Save'}
              </Button>
         </div>
}

export default connect(mapStateToProps)(ProfileEditImageCrop);
