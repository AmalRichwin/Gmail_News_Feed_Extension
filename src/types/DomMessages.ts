export type DOMMessage = {
  type: 'GET_DOM'
}

export type DOMMessageResponse = {
  mails: {
    title: string
    subject: string
    isMailViewed: boolean
  }[]
}
