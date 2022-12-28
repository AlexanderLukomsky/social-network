import { NavLink } from 'react-router-dom';

type DialogItemType = {
  title: string;
  id: string;
  img: string;
};
export const DialogItem = (props: DialogItemType) => (
  <div>
    <span>
      <img src={props.img} alt="avka" />
    </span>
    <NavLink end to={`/dialogs/${props.id}`} id={props.id}>
      {props.title}
    </NavLink>
  </div>
);
