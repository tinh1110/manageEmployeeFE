import user from 'pusher-js/types/src/core/user'
import { CommentSection } from 'react-comments-section'
import { getUser } from '../../libs/helpers/getLocalStorage'
import { useEffect, useState } from 'react'
import { Spin, notification } from 'antd'
import {
  addComment,
  commentEvent,
  deleteComment,
  updateComment,
} from '../../services/comment'
import Pusher from 'pusher-js'
interface IProps {
  event_id: number
}
const EventComment: React.FC<IProps> = ({ event_id }) => {
  const user = getUser()
  const [res, setRes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [comment, setComment] = useState<any>()
  useEffect(() => {
    handleGetEventComment()
  }, [comment])
  useEffect(() => {
    const pusher = new Pusher('718f9af2e483f5b858af', {
      cluster: 'ap1',
    })
    const channel = pusher.subscribe('comment')
    channel.bind('comment', (data: any) => {
      setComment(data.comment)
    })
  }, [])

  const handleGetEventComment = async () => {
    setIsLoading(true)
    try {
      const response = await commentEvent(event_id)
      setRes(response.data.data)
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Get Comment failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          duration: 5,
          message: 'Get event failed',
          description: err.response.data.message,
        })
      }
    }
    setIsLoading(false)
  }

  const handleAddComment = async (data: any) => {
    try {
      const comment = {
        body: data.text,
        user_id: data.userId,
        event_id: event_id,
      }
      const response = await addComment(comment)
      notification['success']({
        message: 'Add Comment successful',
      })
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Add Comment failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          duration: 5,
          message: 'Add event failed',
          description: err.response.data.message,
        })
      }
    }
  }
  const handleReplyComment = async (data: any) => {
    try {
      const comment = {
        body: data.text,
        user_id: data.userId,
        parent_id: data?.repliedToCommentId,
        event_id: event_id,
      }
      const response = await addComment(comment)
      notification['success']({
        message: 'Reply Comment successful',
      })
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Reply Comment failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          duration: 5,
          message: 'Reply event failed',
          description: err.response.data.message,
        })
      }
    }
  }
  const handleEditComment = async (data: any, id: number) => {
    try {
      const comment = {
        body: data.text,
      }
      const response = await updateComment(comment, id)
      notification['success']({
        message: 'Edit Comment successful',
      })
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Edit Comment failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          duration: 5,
          message: 'Edit event failed',
          description: err.response.data.message,
        })
      }
    }
  }
  const handleDeleteComment = async (id: number) => {
    try {
      const response = await deleteComment(id)
      notification['success']({
        message: 'Delete Comment successful',
      })
    } catch (err: any) {
      if (err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Delete Comment failed',
          description: (
            <div
              dangerouslySetInnerHTML={{ __html: errorMessages }}
              className="text-red-500"
            />
          ),
        })
      } else {
        notification['error']({
          duration: 5,
          message: 'Delete event failed',
          description: err.response.data.message,
        })
      }
    }
  }
  return (
    <>
      {isLoading ? (
        <Spin className="flex justify-center" />
      ) : (
        <CommentSection
          currentUser={{
            currentUserId: user.id,
            currentUserImg: user?.avatar || './user.png',
            currentUserProfile: `http://localhost:3000/profile/${user.id}`,
            currentUserFullName: user.name,
          }}
          logIn={{
            loginLink: 'http://localhost:3001/',
            signupLink: 'http://localhost:3001/',
          }}
          commentData={res}
          inputStyle={{ border: '1px solid rgb(208 208 208)' }}
          removeEmoji={true}
          // replyInputStyle={{ display: 'none' }}
          titleStyle={{ fontSize: '14px' }}
          onSubmitAction={(data: {
            userId: number
            comId: number
            text: string
            commentId: string
          }) => handleAddComment(data)}
          onDeleteAction={(data: {
            comIdToDelete: number
            parentOfDeleteId: number
          }) => handleDeleteComment(data.comIdToDelete)}
          onReplyAction={(data: {
            userId: number
            parentOfRepliedCommentId: number
            repliedToCommentId: number
            fullName: string
            text: string
          }) => handleReplyComment(data)}
          onEditAction={(data: {
            userId: number
            comId: number
            text: string
          }) => handleEditComment(data, data.comId)}
        />
      )}
    </>
  )
}
export default EventComment
