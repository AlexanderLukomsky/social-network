import { FC } from 'react'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectAuth } from "../../../common/selectors/selectors"
import { useAppDispatch } from "../../../redux/redux-store"
import { getProfileStatus } from "../profile-reducer"


export const ProfileStatus: FC<{ profileStatus: string | null }> = ({ profileStatus }) => {



    return (
        <div >
            {profileStatus}
        </div>
    )
}