import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { followThunkCreator, getUsersThunkCreator, toggleFollowingProgressAC, unfollowThunkCreator } from "../../redux/user-reducer";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { UsersAPIComponent } from "./UsersAPIComponent";
const MapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
const AC = {
    togleFollowingProgress: toggleFollowingProgressAC,
    getUsersThunkCreator: getUsersThunkCreator,
    followThunkCreator: followThunkCreator,
    unfollowThunkCreator: unfollowThunkCreator
}

export const UsersContainer = connect(MapStateToProps, AC)(UsersAPIComponent)