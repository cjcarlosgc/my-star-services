import jwt from 'jsonwebtoken';

export const authMiddleware = (request, response, next) => {
  const token = request?.header('Authorization')?.split(' ')[1];

  console.log(token);

  if (!token)
    return response.status(401).json({
      error: 'Acceso denegado, no hay un token proporcionado',
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return response.status(403).json({
        error: 'Token inválido',
      });
    } else {
      request.user = user;

      next();
    }
  });
};
