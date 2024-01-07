import { CommentSection } from 'react-comments-section'
import { getUser } from '../../libs/helpers/getLocalStorage'
import { useEffect, useState } from 'react'
import { Spin, notification } from 'antd'
import {
  addCommentIssue,
  commentIssue,
  deleteCommentIssue,
  updateCommentIssue,
} from '../../services/request/commentIssue'
import useravt from '../../assets/user.png'
interface IProps {
  issue_id: number
}
const IssueComment: React.FC<IProps> = ({ issue_id }) => {
  const user = getUser()
  const [res, setRes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [comment, setComment] = useState<any>()
  useEffect(() => {
    handleGetIssueComment()
  }, [])

  const handleGetIssueComment = async () => {
    setIsLoading(true)
    try {
      if (issue_id) {
        const response = await commentIssue(issue_id)

        setRes(response.data.data)
      }
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
          message: 'Get issue failed',
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
        issue_id: issue_id,
        event_id: issue_id,
      }
      const response = await addCommentIssue(comment)
      notification['success']({
        message: 'Bình luận thành công',
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
          message: 'Bình luận thất bại',
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
          message: 'Bình luận thất bại',
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
        issue_id: issue_id,
      }
      const response = await addCommentIssue(comment)
      notification['success']({
        message: 'Bình luận thành công',
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
          message: 'Bình luận thất bại',
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
          message: 'Bình luận thất bại',
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
      const response = await updateCommentIssue(comment, id)
      notification['success']({
        message: 'Sửa bình luận thành công',
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
          message: 'Sửa bình luận thất bại',
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
          message: 'Sửa bình luận thất bại',
          description: err.response.data.message,
        })
      }
    }
  }
  const handleDeleteComment = async (id: number) => {
    try {
      const response = await deleteCommentIssue(id)
      notification['success']({
        message: 'Xóa bình luận thành công',
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
          message: 'Xóa bình luận thất bại',
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
          message: 'Xóa bình luận thất bại',
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
            currentUserImg: user?.avatar || useravt,
            currentUserProfile: `http://localhost:3000/profile/${user.id}`,
            currentUserFullName: user.name,
          }}
          logIn={{
            loginLink: 'http://localhost:3002/',
            signupLink: 'http://localhost:3002/',
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
export default IssueComment
