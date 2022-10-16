import React from "react";
import { Preloader } from "../common/Preloader";
import { UsersForUserPageType, UsersPageType } from "../types/StateType";
import { Users } from "./Users";
type UsersPropsType = {
    users: UsersForUserPageType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    followThunkCreator: (userID: number) => void
    unfollowThunkCreator: (userID: number) => void
}
export class UsersAPIComponent extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
        document.title = 'Users'
    }
    changeCurrentPage = (page: number) => {
        this.props.getUsersThunkCreator(page, this.props.pageSize)
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader /> :
                <Users
                    followingInProgress={this.props.followingInProgress}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    changeCurrentPage={this.changeCurrentPage}
                    unfollowThunkCreator={this.props.unfollowThunkCreator}
                    followThunkCreator={this.props.followThunkCreator}
                />}
        </>
    }
}