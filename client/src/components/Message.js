import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/userSlice';
import calendar from 'dayjs/plugin/calendar';
import MessageButtons from './MessageButtons';
import EditMessageForm from './EditMessageForm';
import useDecodeHtmlEntities from '../hooks/useDecodeHtmlEntities';

dayjs.extend(calendar);

export default function Message({ id, user: { id: userId, nickname }, content, edited, createdAt, updatedAt, merge }) {
  const user = useSelector(getUser);
  const [edit, setEdit] = useState(false);
  const [hovering, setHovering] = useState(false);
  
  const decodedContent = useDecodeHtmlEntities(content);

  return (
    <div className={`flex gap-4 rounded-sm ${user.id === userId && 'hover:bg-gray-50'} ${!merge && 'mt-2'}`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div className="w-full">
        {!merge && (
          <div className="flex gap-2 items-center">
            <span className="font-bold">{nickname}</span>
            <span className="text-gray-400 text-sm">{dayjs(createdAt).calendar()}</span>
          </div>
        )}
        <div>
          {edit ? (
            <EditMessageForm id={id} content={decodedContent} setEdit={setEdit} />
          ) : (
            <pre
              title={merge ? `Sent: ${dayjs(createdAt).calendar()}` : ''}
              style={{ fontFamily: 'sans-serif' }}
              className="overflow-x-auto whitespace-pre-wrap break-words"
              >{decodedContent}{edited && <span title={`Edited: ${dayjs(updatedAt).calendar()}`} className="ml-2 italic text-xs text-gray-400">edited</span>}</pre>
          )}
        </div>
      </div>
      {user.id === userId && hovering && !edit && <MessageButtons id={id} setEdit={setEdit} />}
    </div>
  );
}
