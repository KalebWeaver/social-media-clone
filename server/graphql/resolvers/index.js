const postResolvers = require('./posts')
const userResolvers = require('./users')
const commentResolvers = require('./comments')
const likesResolvers = require('./likes')

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
}
