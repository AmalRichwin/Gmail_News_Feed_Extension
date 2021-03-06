import { DOMMessage, DOMMessageResponse } from '../types'

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  if (msg.type === 'TOGGLE') {
    console.log('ON TOGGLE')
    toggle()
  } else if (msg.type === 'GET_MAILS') {
    const mails = Array.from(document.getElementsByClassName('zA')).map(
      (mail) => {
        const isMailViewed = mail.className.includes('yO')

        return {
          title: mail.getElementsByClassName('bA4')[0].textContent,
          subject: isMailViewed
            ? mail.getElementsByClassName('bog')[0].textContent
            : mail.getElementsByClassName('bqe')[0].textContent,
          isMailViewed,
        }
      }
    )

    const response: DOMMessageResponse = {
      type: 'GET_MAILS_RESPONSE',
      mails: mails,
    }

    sendResponse(response)
  }
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */

chrome.runtime.onMessage.addListener(messagesFromReactAppListener)

const iframe = document.createElement('iframe')
iframe.style.background = 'green'
iframe.style.height = '100vh'
iframe.style.width = '0px'
iframe.style.position = 'fixed'
iframe.style.top = '0px'
iframe.style.right = '0px'
iframe.style.zIndex = '9000000000000000000'
iframe.frameBorder = 'none'
iframe.src = chrome.extension.getURL('index.html')

document.body.appendChild(iframe)

function toggle() {
  if (iframe.style.width == '0px') {
    iframe.style.width = '35rem'
  } else {
    iframe.style.width = '0px'
  }
}
