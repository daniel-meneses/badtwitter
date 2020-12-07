import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import 'react-image-crop/lib/ReactCrop.scss'
import { connect } from 'react-redux'
import { getPresignedUrl, postImageToPresignedURL } from '../../actions/account'
import ProfileEditImageCrop from '../ProfileEditImageCrop/ProfileEditImageCrop'
import Avatar from '../Avatar/Avatar'
import { selectCurrentUser } from '../../reducers/globalObjects';
import PlusIcon from '../../common/components/SvgLib/PlusIcon'
import styles from './ProfileEditImage.mod.scss';

type Props = {
  userAvatar: string,
  presignedURL: string,
  preSignedImage: string,
  dispatch: AppThunkDispatch;
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

const ProfileEditImage: React.FC<Props> = ({ userAvatar, dispatch }) => {

  const [imageSrc, setImageSrc] = useState<string>("");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()
      reader.onload = () => {
        var dataURL = reader.result
        if (typeof dataURL == "string") {
          setImageSrc(dataURL);
          dispatch(getPresignedUrl());
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
    dispatch(postImageToPresignedURL(presignedURL.url, croppedImage))
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
export default connect(mapStateToProps)(ProfileEditImage);
