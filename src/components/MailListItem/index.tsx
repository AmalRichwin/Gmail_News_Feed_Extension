import React from 'react'

type Props = {
  title: string
  subject: string
  isMailViewed: boolean
}

export default function MailListItem({ title, subject, isMailViewed }: Props) {
  return (
    <div className="p-2 my-5 border-2 border-gray-300 hover:bg-gray-200">
      <div className="flex flex-row justify-between rounded-sm">
        <h2 className="font-bold font-opensans">{title}</h2>
        <span
          className={`${
            isMailViewed ? 'text-gray-600/60' : 'bg-lime-500 text-white'
          } p-1 border-2 rounded-md text-xs`}
        >
          {isMailViewed ? 'Viewed' : 'New'}
        </span>
      </div>
      <div>
        <p className="font-opensans">{subject}</p>
      </div>
    </div>
  )
}
