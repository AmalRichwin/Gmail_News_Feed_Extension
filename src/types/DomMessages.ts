export type DOMMessage = {
  type: 'GET_MAILS' | 'TOGGLE'
}

export type DOMMessageResponse = {
  type: 'GET_MAILS_RESPONSE'
  mails: {
    title: string
    subject: string
    isMailViewed: boolean
  }[]
}
