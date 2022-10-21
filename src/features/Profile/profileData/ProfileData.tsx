import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomProgress } from '../../../common/components/CustomProgress/CustomProgress';
import { selectAuthUserId, selectProfile } from '../../../common/selectors/selectors';
import { useAppDispatch } from '../../../redux/redux-store';
import { EditProfileModal } from '../editProfileModal/EditProfileModal';
import { updateProfile } from '../profile-reducer';
import { ProfilePhoto } from './profilePhoto/ProfilePhoto';
import './profileData.scss';
import { Paper } from '@mui/material';
export const ProfileData = () => {
    const dispatch = useAppDispatch()
    const { data, status, profileStatus } = useSelector(selectProfile)
    const authId = useSelector(selectAuthUserId)
    const isOwner = data.userId === authId

    const [isOpenModal, setIsOpenModal] = useState(false)

    const [fullName, setFullName] = useState(data.fullName)
    const [aboutMe, setAboutMe] = useState(data.aboutMe)
    const [contacts, setContacts] = useState({ github: data.contacts.github })


    const onCloseModalHandler = () => { setIsOpenModal(false) }
    const onOpenModalHandler = () => { setIsOpenModal(true) }

    const onSubmitHandler = () => {
        const data = {
            fullName, aboutMe, contacts, userId: authId
        }
        dispatch(updateProfile(data))
    }
    if (status === 'pending') { return <CustomProgress /> }
    return (
        <Paper elevation={3} className='profile-data' >
            <ProfilePhoto photo={data.photos.large} isOwner={isOwner} />

            <div className='profile-data__description description'>
                <h4 className="description__name">
                    {data.fullName}
                    {
                        isOwner &&
                        <IconButton size='small' onClick={onOpenModalHandler}>
                            <EditIcon fontSize='small' color='primary' />
                        </IconButton>
                    }
                </h4>
                {
                    profileStatus &&
                    <div>
                        {profileStatus}
                    </div>
                }
                {
                    data.aboutMe &&
                    <div className='description__text'>
                        {data.aboutMe}
                    </div>
                }
                {
                    isOwner && data.contacts.github &&
                    <Link target={'_blank'} href={data.contacts.github}>
                        Github
                    </Link>
                }
            </div>
            <EditProfileModal
                isOpen={isOpenModal}
                fullName={fullName}
                aboutMe={aboutMe === null ? '' : aboutMe}
                contacts={contacts}
                onClose={onCloseModalHandler}
                onSubmit={onSubmitHandler}
                onChangeFullName={setFullName}
                onChangeAboutMe={setAboutMe}
                onChangeContacts={setContacts}
            />
        </Paper >
    )
}