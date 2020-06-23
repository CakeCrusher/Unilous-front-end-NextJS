import { gql } from 'apollo-boost'

export const CREATE_POST = gql`
  mutation addPost(
    $title: String!,
    $user: ID!,
    $contactLink: String!
    $skillNames: [String!]!,
    $skillCapacities: [Int!]!,
    $skillFills: [Int!]!,
    $description: String!,
    $color: String!,
    $imageLinks: [String!],
    $referenceLinks: [String!]
  ){
    addPost(
      title:$title,
      user:$user,
      contactLink: $contactLink,
      skillNames:$skillNames,
      skillCapacities:$skillCapacities,
      skillFills: $skillFills,
      description:$description,
      color:$color,
      imageLinks:$imageLinks,
      referenceLinks:$referenceLinks
    ){
      title
    }
  }
`

// export const ASK_QUESTION = gql`
// mutation askQuestion(
//   $post: ID!,
//   $user_from: ID!,
//   $question: String!,
// ){
//   askQuestion(
//     post: $post,
//     user_from: $user_from,
//     question: $question,
//   ){
//     _id
//   }
// }
// `

// export const RESPOND_TO_QUESTION = gql`
// mutation respondToQuestion(
//   $question_id: ID!,
//   $answered: Boolean!,
//   $response: String!,
// ){
//   respondToQuestion(
//     question_id: $question_id,
//     answered: $answered,
//     response: $message,
//   ){
//     answered
//     response
//     _id
//   }
// }
// `

// export const CREATE_JOIN_REQUEST = gql`
// mutation createJoinRequest(
//   $post: ID!,
//   $user_from: ID!,
//   $skill: ID!,
//   $message: String!,
// ){
//   createJoinRequest(
//     post: $post,
//     user_from: $user_from,
//     skill: $skill,
//     message: $message,
//   ) {
//     post
//     user_from
//     skill
//     message
//     accepted
//     _id
//   }
// }
// `

// export const ACCEPT_JOIN_REQUEST = gql`
// mutation acceptJoinRequest($join_request: ID!){
//   acceptJoinRequest(join_request: $join_request) {
//     accepted
//     _id
//   }
// }
// `

// export const DECLINE_JOIN_REQUEST = gql`
// mutation declineJoinRequest(
//   $join_request: ID!,
//   $decision_reason: String!,
// ){
//   declineJoinRequest(
//     join_request: $join_request,
//     decision_reason: $decision_reason,
//   ) {
//     accepted
//     decision_reason
//     _id
//   }
// }
// `

// export const CREATE_NOTIFICATION = gql`
// mutation createNotification(
//   $user_from: ID!,
//   $message: String!,
//   $link: String!,
// ){
//   createNotification(
//     user_from: $user_from,
//     message: $message,
//     link: $link,
//   ){
//     user_from,
//     message,
//     link
//     _id
//   }
// }
// `

// export const READ_NOTIFICATION = gql`
// mutation createNotification(
//   $notification: ID!,
// ){
//   createNotification(
//     notification: $notification,
//   ){
//     read
//     _id
//   }
// }
// `

// export const DELETE_PROJECT = gql`
//   mutation deletePost(
//     $user_id: ID!,
//     $project_id: ID!
//   ){
//     deletePost(
//       user_id: $user_id,
//       project_id: $project_id
//     )
//   }
// `

export const CREATE_PROJECT = gql`
  mutation addPost(
    $title: String!,
    $user: ID!,
    $contactLink: String!,
    $skillNames: [String!]!,
    $skillCapacities: [Int!]!,
    $skillFills: [Int!]!,
    $content_types: [String!]!,
    $content_data: [String!]!,
    $color: String!,
  ){
    addPost(
      title:$title,
      user:$user,
      contactLink: $contactLink,
      skillNames:$skillNames,
      skillCapacities:$skillCapacities,
      skillFills: $skillFills,
      content_types: $content_types,
      content_data: $content_data,
      color:$color,
    ){
      title
    }
  }
` 

// export const DELETE_POST = gql`
//   mutation deletePost (
//     $postId: ID!
//   ) {
//     deletePost (postId: $postId)
//   }
// `

export const MAKE_NOTIFICATION = gql`
  mutation makeNotification(
    $userFromId: ID!,
    $userToId: ID!,
    $message: String!,
    $postId: ID,
    $proposedContribution: [Int!]
  ){
    makeNotification(
      userFromId: $userFromId,
      userToId: $userToId,
      message: $message,
      postId: $postId,
      proposedContribution: $proposedContribution
    ){
      _id
    }
  }
`

export const ACCEPT_NOTIFICATION = gql`
  mutation acceptNotification($notificationId: ID!) {
    acceptNotification(notificationId: $notificationId) {
      userFrom {
        username
        _id
      }
      userTo {
        username
        _id
      }
      message
      post{
        title
        color
        skillNames
        skillFills
        skillCapacities
        _id
      }
      proposedContribution
      accepted
      _id
    }
  }
`

export const DECLINE_NOTIFICATION = gql`
  mutation declineNotification($notificationId: ID!) {
    declineNotification(notificationId: $notificationId) {
      userFrom {
        username
        _id
      }
      userTo {
        username
        _id
      }
      message
      post{
        title
        color
        skillNames
        skillFills
        skillCapacities
        _id
      }
      proposedContribution
      accepted
      _id
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $referenceLink: String!) {
    createUser(
      username: $username,
      password: $password,
      referenceLink: $referenceLink
    ){
      username
      password
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(
      username: $username,
      password: $password
    ){
      value
    }
  }
`

export const SAVE_POST = gql`
  mutation savePostToUser (
    $user: ID!,
    $postId: ID!
  ) {
    savePostToUser (user: $user, postId: $postId) {
      username
    }
  }
`
export const REMOVE_SAVED_POST = gql`
  mutation removeSavedPost (
    $user: ID!,
    $postId: ID!
  ) {
    removeSavedPost (user: $user, postId: $postId)
  }
`

export const ASK_QUESTION = gql`
  mutation askQuestion (
    $userFromId: ID!,
    $userToId: ID!,
    $postId: ID!,
    $question: String!
  ){
    askQuestion (
      userFromId: $userFromId,
      userToId: $userToId,
      postId: $postId,
      question: $question
    ){
      userFrom {
        username
      }
      userTo {
        username
      }
      message
      post{
        title
        color
        skillNames
        skillFills
        skillCapacities
        _id
      }
      proposedContribution
      question
      answer
      accepted
      _id
    }
  }
`

export const ANSWER_QUESTION = gql`
  mutation answerQuestion (
    $notificationId: ID!,
    $response: String!
  ) {
    answerQuestion (
      notificationId: $notificationId,
      response: $response
    ){
      userFrom {
        username
      }
      userTo {
        username
      }
      message
      post{
        title
        color
        skillNames
        skillFills
        skillCapacities
        _id
      }
      proposedContribution
      question
      answer
      accepted
      _id
    }
  }
`