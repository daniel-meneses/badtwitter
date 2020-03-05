import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import 'react-image-crop/lib/ReactCrop.scss'
import './ProfileEditImage.scss'
import { connect } from 'react-redux'
import { getPresignedUrl } from '../../actions/profile'
import ProfileEditImageCrop from '../ProfileEditImageCrop/ProfileEditImageCrop'

type Props = {
  getPresignedUrl: () => void
}

const ProfileEditImage = ({getPresignedUrl} : Props) => {

  const [imageSrc, setImageSrc] = useState<string>("");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file :any) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        var dataURL = reader.result
        if (typeof dataURL == "string") {
          setImageSrc(dataURL)
          getPresignedUrl();
        }
      }
      reader.readAsDataURL(file)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div>
      { !imageSrc ?
      <div className={'uploader'} >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <img className={'upload_placeholder'}
             src={'https://images-03.s3-ap-southeast-2.amazonaws.com/upload.png'}
             alt={'Upload placeholder'}/>
        <div>Upload image</div>
        </div>
      </div>
      :
        <ProfileEditImageCrop src={imageSrc}/>
    }
    </div>
  )
}
export default connect(null, {getPresignedUrl})(ProfileEditImage);
