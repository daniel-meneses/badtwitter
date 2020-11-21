import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import 'react-image-crop/lib/ReactCrop.scss'
import { connect } from 'react-redux'
import { getPresignedUrl, postImageToPresignedURL } from '../../actions/account'
import ProfileEditImageCrop from '../ProfileEditImageCrop/ProfileEditImageCrop'
import Avatar from '../Avatar/Avatar'
import { selectCurrentUser } from '../../reducers/users';
import PlusIcon from '../../common/components/SvgLib/PlusIcon'
import styles from './ProfileEditImage.mod.scss';

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

  return (
    <div className={styles.editContainer}>
      { !imageSrc ?
        <div className={styles.editUploader} >
          <div className={styles.poop} {...getRootProps()}>
            <PlusIcon className={styles.plusIcon}/>
            <input {...getInputProps()} />
            <Avatar image={userAvatar} className={styles.uploadPlaceholder} />
          </div>
        </div>
        :
        <div className={styles.editImageContainer}>
          <div className={styles.editInProgressBackground} onClick={() => setImageSrc("")} />
          <ProfileEditImageCrop src={imageSrc} handleSubmit={handleSubmit} />
        </div>
      }
    </div>
  )
}
export default connect(mapStateToProps, { getPresignedUrl, postImageToPresignedURL })(ProfileEditImage);
