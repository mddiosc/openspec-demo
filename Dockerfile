# Build stage
FROM node:20-alpine3.21 AS builder
WORKDIR /app

# Instalar dependencias aprovechando el layer cache de Docker
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copiar el resto del código y compilar
COPY . .
RUN npm run build

# Serve stage
# Imagen pinnada para evitar CVEs inesperados entre builds
FROM nginx:1.27-alpine3.21

# Eliminar la configuración por defecto de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar el build estático y la configuración personalizada
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ejecutar nginx como usuario no-root (nginx user ya existe en la imagen oficial)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
