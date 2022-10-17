import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import MyPopup from '../utils/MyPopup'

export default function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    profile,
    likeCount,
    commentCount,
    likes,
  },
}) {
  const { user } = React.useContext(AuthContext)

  return (
    <Card fluid>
      <Card.Content>
        <Image floated="right" size="mini" src={profile} />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="teal" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="teal" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  )
}
