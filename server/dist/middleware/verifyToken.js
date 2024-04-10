export {};
// export const verifyToken = (req: Request,res: Response)=> {
//   const token = req.headers.authorization || ''
//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {userId: string}
//     req.user = decodedToken
//   } catch (error) {
//     console.error(error)
//     res.status(401).json({
//       error: 'Unauthorized'
//     })
//   }
// }
