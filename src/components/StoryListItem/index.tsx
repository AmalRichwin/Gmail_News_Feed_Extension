import * as React from 'react'
import UpArrowIcon from '../../icons/UpArrowIcon'

interface IListItemProps {
  title: string
  description: string
  publishDate?: Date
  linkToPost: string
}

const StoryListItem: React.FC<IListItemProps> = ({
  description,
  linkToPost,
  publishDate,
  title,
}) => {
  return (
    <div className="p-2 my-5 border-2 border-gray-300 hover:bg-gray-200">
      <div className="flex justify-between rounded-sm ">
        <div className="flex gap-2">
          <h3 className="text-sm font-semibold font-opensans">{title}</h3>
        </div>
        <div className="flex items-center justify-center gap-2 ml-2">
          <a
            className={`bg-[#271c6e] shadow-[#271c6e] px-1 py-1 font-opensans font-semibold text-xs group text-white rounded-md shadow-sm`}
            href={linkToPost}
            referrerPolicy="no-referrer"
            target="_blank"
            rel="noreferrer"
          >
            <UpArrowIcon className="inline w-3 h-3 rotate-45" />
          </a>
        </div>
      </div>
      <div className="my-1">
        <p className="font-opensans ">{description}</p>
      </div>
      <div>
        <time className="text-xs text-gray-700 font-opensans">
          {publishDate}
        </time>
      </div>
    </div>
  )
}

export default StoryListItem
