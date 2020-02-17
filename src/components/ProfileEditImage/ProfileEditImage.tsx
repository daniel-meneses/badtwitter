import React, {useCallback, useState} from 'react'
import ReactCrop from 'react-image-crop'
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

  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div>
      { !imageSrc ?
      <div className={'uploader'} >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <img className={'upload_placeholder'} src={'https://images-03.s3-ap-southeast-2.amazonaws.com/upload.png'}  />
        <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
      :
      <div className={"uploaded_image"}>
        <ProfileEditImageCrop src={imageSrc}/>
      </div>
    }
    </div>
  )
}
export default connect(null, {getPresignedUrl})(ProfileEditImage);
