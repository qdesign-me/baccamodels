export default async (req, res) => {
  res.status(401).json({ message: 'auth failed' });
};
