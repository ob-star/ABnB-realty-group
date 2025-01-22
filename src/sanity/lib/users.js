import SanityClient from './client';
const client = SanityClient();

export default async function usersHandler(req, res) {
    try {
      const users = await client.request({
        method: 'GET',
        url: '/users', // Get the list of users
      });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }