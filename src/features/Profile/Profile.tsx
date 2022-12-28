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
  selectProfileIsInitialized,
  selectProfileNotice,
} from 'common/selectors';
import { useAppDispatch } from 'redux/redux-store';
import './profile.scss';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const { userId } = useParams<{ userId: string }>();
  const isAuth = useSelector(selectIsAuth);
  const data = useSelector(selectAuthData);
  const notice = useSelector(selectProfileNotice);
  const isInitialized = useSelector(selectProfileIsInitialized);

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
      dispatch(getProfileStatus(userId));
    } else if (isAuth && data.id) {
      dispatch(getProfile(data.id.toString()));
      dispatch(getProfileStatus(data.id.toString()));
    }
    return () => {
      dispatch(setIsInitialized(false));
    };
  }, [dispatch, userId, data.id, isAuth]);

  if (!isAuth) return <Navigate to={appPath.LOGIN} />;

  return (
    <div className="profile">
      {isInitialized ? (
        <>
          <ProfileData />
          <Posts />
          <CustomSnackbar message={notice} isOpen={!!notice} onClose={() => {}} />
        </>
      ) : (
        <CustomProgress />
      )}
    </div>
  );
};
