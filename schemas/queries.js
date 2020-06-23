import { gql } from 'apollo-boost'

// query listOfNotifications($notifications: [ID!]) {
export const LIST_OF_NOTIFICATIONS = gql`
  query listOfNotifications($notifications: [String!]) {
    listOfNotifications(notifications: $notifications) {
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
        contactLink
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

// export const LIST_OF_QUESTIONS = gql`
// query listOfQuestions($post: ID!) {
//   listOfQuestions(post: $post) {
//     user_from
//     question
//     answered
//     response
//     _id
//   }
// }
// `

// export const LIST_OF_QUESTIONS_FROM_SENDER = gql`
// query listOfQuestions(
//   $post: ID!,
//   $user_from: ID!,
// ) {
//   listOfQuestions(
//     post: $post,
//     user_from: $user_from,
//   ) {
//     user_from
//     question
//     answered
//     response
//     _id
//   }
// }
// `

// export const LIST_OF_JOIN_REQUESTS = gql`
// query listOfJoinRequests($from_post: ID!) {
//   listOfJoinRequests(from_post: $from_post) {
//     post
//     user_from
//     skill
//     message
//     accepted
//     reason
//     _id
//   }
// }
// `
// export const LIST_OF_JOIN_REQUESTS_FROM_SENDER = gql`
// query listOfJoinRequestsFromSender(
//   $from_post: ID!,
//   $user_from: ID!,
// ) {
//   listOfJoinRequestsFromSender(
//       from_post: $from_post,
//       user_from: $user_from,
//   ) {
//     post
//     user_from
//     skill
//     message
//     accepted
//     reason
//     _id
//   }
// }
// `

// export const LIST_OF_NOTIFICATIONS = gql`
//   query listOfNotifications($notification_list: [ID!]) {
//     listOfNotifications(notification_list: $notification_list) {
//       user_from,
//       message,
//       link,
//       read,
//       _id
//     }
//   }
// `

export const FIND_PROJECT = gql`
  query findPost($title: String!){
    findPost(title: $title){
      title,
      user {
        username
        _id
      }
      content {
        __typename
        ... on ContentText {
          text
        }
        ... on ContentImage {
          image
        }
      }
      skillNames
      skillCapacities
      skillFills
      time
      team
      color
      _id
    }
  }
`

export const SKILL_SEARCH = gql`
  query skillSearch($filter: String!) {
    skillSearch(filter: $filter) {
      name
      uses
    }
  }
`

export const ME = gql`
  query {
    me{
      username
      referenceLink
      primarySkills{
        name
      }
      secondarySkills{
        name
      }
      interests
      posts{
        title
        skillCapacities
        skillFills
        _id
      },
      notifications{
        userFrom{
          _id
        }
        userTo{
          _id
        }
        message
        post{
          title
          _id
        }
        proposedContribution
        accepted
      }
      _id

    }
  }
`
// query getListOfPosts($id_list: [ID!]) {
export const LIST_OF_POSTS = gql`
  query getListOfPosts($id_list: [String]) {
    getListOfPosts(idList: $id_list){
      title
      user{
        username
        _id
      }
      color
      skillFills
      skillCapacities
      _id
    }
  }
`

export const FIND_POST = gql`
  query findPost($title: String!){
    findPost(title: $title){
      title
      user {
        username
        _id
      }
      skillNames
      skillCapacities
      skillFills
      team
      time
      description
      color
      imageLinks
      referenceLinks
      _id
    }
  }
`

export const FIND_USER = gql`
  query findUser($username: String!){
    findUser(username: $username) {
      username
      password
      referenceLink
      primarySkills{
        name
      }
      secondarySkills{
        name
      }
      interests
      posts{
        _id
      }
      notifications {
        _id
      }
      savedPosts {
        _id
      }
      _id
    }
  }
`

export const ALL_USERS = gql`
  query{
    allUsers{
      username
      _id
    }
  }
`

export const SOME_USERS = gql`
  query someUsers($skip: Int!, $first: Int!){
    someUsers(skip: $skip, first: $first){
      username
    }
  }
`

export const ALL_POSTS = gql`
  query{
    allPosts{
      title
      user{
        username
        _id
      }
      skillNames
      skillCapacities
      skillFills
      time
      description
      color
      imageLinks
      referenceLinks
      _id
    }
  }
`

export const GET_POST_TITLES = gql`
  query{
    allPosts{
      title
    }
  }
`

export const SEARCH_POSTS = gql`
  query searchPosts($filterString: String!, $postIds: [String!], $eventQuery: String){
    searchPosts(filterString: $filterString, postIds: $postIds, eventQuery: $eventQuery){
      title
      user {
        username
        _id
      }
      skillNames
      skillCapacities
      skillFills
      time
      description
      color
      _id
    }
  }
`

export const PENDING_NOTIFS = gql`
  query searchAwaitingNotifs($userId: ID!) {
    searchAwaitingNotifs(userId: $userId)
  }
`

export const Q_AND_A_NOTIFS = gql`
  query searchAnsweredQToPost ( $title: String! ) {
    searchAnsweredQToPost (
      title: $title
    ){
      userFrom{
        username
      }
      userTo {
        username
      }
      question
      answer
      _id
    }
  }
`