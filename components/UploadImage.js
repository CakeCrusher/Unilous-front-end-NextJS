import React, {useState} from 'react'
import { connect } from 'react-redux'
import IU from '../styles/imageUpload.module.css'

const UploadImage = (props) => {
    let fileInput = React.createRef()
    const [imageURL, setImageURL] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    const uploadToImgur = (file) => {
        const onImageSuccess = (link) => {
            props.onSuccess(link)
        }
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', "Client-ID cc972a94b762b77");
        xhr.setRequestHeader('Content-Type', 'multipart/form-data;');
        xhr.onload = function() {
            var response = xhr.response
            if (response.success) {
                var link = response.data.link;
                onImageSuccess(link)
            }
            else {
                alert('please enter an image in .jpg / .png / .gif format.')
            }
        }
        xhr.send(file);
    }
    const showImageOrGuide = imageFile ?
        <label for="fileInput" className={IU.imageLabel}>
            <img src={URL.createObjectURL(imageFile)} className={IU.imageInContainer} />
        </label>
        :
        <label for="fileInput" className={IU.imageLabel}>
            <div className={IU.labelItemsContainer}>
                <img src="/svg/imageUploadB.svg" className={IU.imageIcon} />
                <h2>select or drop image</h2>
            </div>
        </label>
    const showSetButton = imageFile ? 
        <button onClick={() => uploadToImgur(fileInput.current.files[0])} className={IU.submitButton}>set</button> : null
    
    return (
        <div className={IU.imageUploadContainer}>
            {showImageOrGuide}
            <input id="fileInput" type="file" ref={fileInput} accept=".jpg,.png,.gif" className={IU.imageInput} onChange={() => setImageFile(fileInput.current.files[0])} />
            {showSetButton}
        </div>
    )
}

//const mapStateToProps = (state) => {
//	return {
        
//	}
//}
export default connect(
    null
)(UploadImage)