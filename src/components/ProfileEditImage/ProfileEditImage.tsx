import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import 'react-image-crop/lib/ReactCrop.scss'
import './ProfileEditImage.scss'
import { connect } from 'react-redux'
import { getPresignedUrl, postImageToPresignedURL } from '../../actions/account'
import ProfileEditImageCrop from '../ProfileEditImageCrop/ProfileEditImageCrop'
import Avatar from '../Avatar/Avatar'
import { selectCurrentUser } from '../../reducers/users';

type Props = {
  getPresignedUrl: () => void,
  postImageToPresignedURL: (e: string, a: any) => void,
  userAvatar: string,
  presignedURL: string,
  preSignedImage: string,
}

function mapStateToProps(state: any, ownProps: any) {
  let { account } = state.account
  let { presignedURL, preSignedImage } = account;
  let user = selectCurrentUser(state) || {}
  return {
    userAvatar: user.avatar,
    presignedURL,
    preSignedImage,
  }
}

const ProfileEditImage = (props: Props) => {

  const { getPresignedUrl, postImageToPresignedURL, userAvatar } = props;

  const [imageSrc, setImageSrc] = useState<string>("");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
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
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleSubmit = (presignedURL: any, croppedImage: any) => {
    const formData = new FormData()
    formData.append('avatar', imageSrc)
    postImageToPresignedURL(presignedURL.url, croppedImage)
    setImageSrc("")
  }

  const bgSvg = <svg className='plus_svg' viewBox='0 0 24 24'><g><path d='M19.75 11H13V4.25c0-.553-.447-1-1-1s-1 .447-1 1V11H4.25c-.553 0-1 .447-1 1s.447 1 1 1H11v6.75c0 .553.447 1 1 1s1-.447 1-1V13h6.75c.553 0 1-.447 1-1s-.447-1-1-1z' />
  </g></svg>

  return (
    <div className='profile_edit_image_container'>
      { !imageSrc ?
        <div className={'uploader'} >
          <div className={'poop'} {...getRootProps()}>
            {bgSvg}
            <input {...getInputProps()} />
            <Avatar image={userAvatar} className='upload_placeholder' />
          </div>
        </div>
        :
        <div >
          <div className='float_bg' onClick={() => setImageSrc("")} />
          <ProfileEditImageCrop src={imageSrc} handleSubmit={handleSubmit} />
        </div>
      }
    </div>
  )
}
export default connect(mapStateToProps, { getPresignedUrl, postImageToPresignedURL })(ProfileEditImage);
