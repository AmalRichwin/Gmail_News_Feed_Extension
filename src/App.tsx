import axios from 'axios'
import React from 'react'
import MailListItem from './components/MailListItem'
import StoryListItem from './components/StoryListItem'
import './styles.css'
import { DOMMessageResponse } from './types'

interface IStory {
  title: string
  description: string
  link: string
  publishDate: Date
}

interface IMail {
  subject: string
  title: string
  isMailViewed: boolean
}

function App() {
  const [stories, setStories] = React.useState<IStory[]>([])
  const [mails, setMails] = React.useState<IMail[]>()

  const fetchStories = async () => {
    try {
      const { data } = await axios.get(
        'https://timesofindia.indiatimes.com/rssfeedstopstories.cms'
      )
      if (data) {
        const rssStoriesFeed = new window.DOMParser().parseFromString(
          data,
          'text/xml'
        )

        const items = rssStoriesFeed.querySelectorAll('item')

        const feedItems = [...items].map((item) => ({
          title: item.children[0].innerHTML,
          description: item.children[1].innerHTML,
          link: item.children[2].innerHTML,
          publishDate: item.children[4].innerHTML,
        }))

        setStories(feedItems)
      }
    } catch (error: InstanceType<Error>) {
      console.log('ERROR FETCHING STORIES')
      throw new Error(error)
    }
  }
  React.useEffect(() => {
    fetchStories()
  }, [])

  React.useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: 'GET_MAILS' },
          (response: DOMMessageResponse) => {
            if (response.type === 'GET_MAILS_RESPONSE') {
              setMails(response.mails)
            }
          }
        )
      })
  })

  return (
    <div className="App">
      <div>
        <h1 className="text-xl text-center font-inter text-neutral-700">
          Mails
        </h1>

        {mails &&
          mails.map((mail, idx) => (
            <MailListItem
              key={`${mail.title} ${idx}`}
              isMailViewed={mail.isMailViewed}
              subject={mail.subject}
              title={mail.title}
            />
          ))}
      </div>
      <div>
        <h2 className="text-xl text-center font-inter text-neutral-700">
          India Times | Top Feeds
        </h2>
        {stories &&
          stories.map((story, idx) => (
            <StoryListItem
              key={`${story.title} ${idx}`}
              title={story.title}
              description={story.description}
              linkToPost={story.link}
              publishDate={story.publishDate}
            />
          ))}
      </div>
    </div>
  )
}

export default App
