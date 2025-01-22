import {useUser} from 'sanity/base/hooks'

const AuthorInput = ({type, value, onChange}) => {
  const user = useUser()
  
  // If user is logged in, set the logged-in user as the author
  if (user) {
    onChange({patch: {set: {_ref: user.id}}})
  }
  
  return <div>Author: {user?.name || 'Not logged in'}</div>
}

export default AuthorInput