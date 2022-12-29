import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { Posts } from './posts/Posts';
import { getProfile, getProfileStatus, setIsInitialized } from './profile-reducer';
import { ProfileData } from './profileData/ProfileData';

import { CustomProgress, CustomSnackbar } from 'common/components';
import { appPath } from 'common/routesPath';
import {
  selectAuthData,
  selectIsAuth,
  selectProfile,
  selectProfileIsInitialized,
  selectProfileNotice,
} from 'common/selectors';
import { useAppDispatch } from 'redux/redux-store';
import './profile.scss';

export const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { userId } = useParams<{ userId: string }>();
  const isAuth = useSelector(selectIsAuth);
  const authData = useSelector(selectAuthData);
  const notice = useSelector(selectProfileNotice);
  const isInitialized = useSelector(selectProfileIsInitialized);

  const profile = useSelector(selectProfile);
  const isOwner = profile.data.userId === authData.id;

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
      dispatch(getProfileStatus(userId));
    } else if (isAuth && authData.id) {
      dispatch(getProfile(authData.id.toString()));
      dispatch(getProfileStatus(authData.id.toString()));
    }

    return () => {
      dispatch(setIsInitialized(false));
    };
  }, [dispatch, userId, authData.id, isAuth]);

  if (!isAuth) return <Navigate to={appPath.LOGIN} />;

  return (
    <div className="profile">
      {isInitialized ? (
        <>
          <ProfileData isOwner={isOwner} />
          {isOwner && <Posts />}
          <CustomSnackbar message={notice} isOpen={!!notice} onClose={() => {}} />
        </>
      ) : (
        <CustomProgress />
      )}
    </div>
  );
};
