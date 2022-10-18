import { IconButton } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './uploadButton.scss'
export const UploadButton = () => {
   return (
      <div className='upload-button'>
         <IconButton
            color="secondary"
            aria-label="upload picture"
            component="label"
         >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera fontSize='large' />
         </IconButton>
      </div>
   )
}