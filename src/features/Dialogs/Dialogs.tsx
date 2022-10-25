import { useAppSelector } from '../../redux/redux-store';

import { DialogItem } from './DialogItem/DialogItem';
import { DialogMessage } from './DialogMessage/DialogMessage';

export const Dialogs = () => {
  const dialogsPage = useAppSelector(state => state.dialogsPage);

  return (
    <div className="dialogs">
      <div className="dialogs__columns">
        <ul className="dialogs__column column__messages">
          {dialogsPage.dialogs.map(el => (
            <li key={el.id} id={el.id}>
              <DialogItem title={el.name} id={el.id} img={el.img} />
            </li>
          ))}
        </ul>
        <ul className="dialogs__column">
          {dialogsPage.messages.map(el => (
            <li key={el.id} id={el.id}>
              <DialogMessage title={el.message} id={el.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
