import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Confirm, Icon } from 'semantic-ui-react'

import {
  FETCH_POSTS_QUERY,
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
} from '../utils/graphql'
import MyPopup from '../utils/MyPopup'

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy, result) {
      setConfirmOpen(false)
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        })
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((p) => p.id !== postId),
          },
        })
      }
      if (callback) callback()
    },
    variables: {
      postId,
      commentId,
    },
  })

  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  )
}
