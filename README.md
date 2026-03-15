# 🥖 Bakery POS

Sistema de **Punto de Venta (POS) para panadería** diseñado para registrar ventas, controlar el inventario y generar reportes administrativos mediante una aplicación web conectada a una base de datos en la nube.

El sistema permite gestionar las operaciones diarias de una panadería desde una interfaz simple y rápida pensada para el mostrador.

---

# 🚀 Instalación del Proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/XITZEL/pos_Bakery.git
```

Entrar a la carpeta del proyecto

```bash
cd pos_Bakery
```

---

## 2. Instalar dependencias

Instala las librerías necesarias para ejecutar el proyecto:

```bash
npm install
```

Dependencias principales utilizadas en el sistema:

```bash
npm install @supabase/supabase-js
npm install react-router-dom
npm install lucide-react
npm install recharts
npm install date-fns
```

---

## 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto y agregar las credenciales de Supabase.

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

Estas variables permiten conectar la aplicación con la base de datos.

---

## 4. Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

Después abre en tu navegador:

```
http://localhost:5173
```

---

# 🧾 Descripción del Sistema

**Bakery Master POS** es un sistema web diseñado para administrar las operaciones de una panadería en una sola sucursal.

El sistema centraliza el registro de ventas, el control de inventario y la generación de reportes administrativos, permitiendo al administrador supervisar la operación del negocio.

---

# 🧩 Funcionalidades Principales

## 🛒 Punto de Venta (POS)

Permite registrar ventas de manera rápida desde el mostrador.

Cada venta incluye:

- ID único de venta
- Fecha y hora
- Usuario (cajero)
- Lista de productos vendidos
- Cantidad
- Precio unitario
- Subtotal por producto
- Total de la venta
- Método de pago (efectivo o tarjeta)
- Número de ticket

Una vez confirmada la venta:

- El inventario se actualiza en la base de datos.
- Se guarda el registro permanente de la transacción.

Las ventas confirmadas **no pueden modificarse posteriormente**.

---

## 📦 Control de Inventario

El sistema mantiene actualizado el inventario en tiempo real.

Cuando se confirma una venta:

- Se descuenta el stock del producto.
- Se registra el movimiento en el historial de inventario.

También permite registrar **mermas** indicando:

- Producto
- Cantidad
- Motivo
- Usuario responsable
- Fecha y hora

---

## 👤 Gestión de Usuarios

El sistema cuenta con dos niveles de acceso:

### Administrador

Tiene control completo del sistema:

- Gestión de productos
- Modificación de precios
- Ajustes de inventario
- Visualización de reportes
- Autorización de cancelaciones
- Gestión de usuarios

### Cajero

Permisos limitados:

- Registrar ventas
- Consultar inventario
- Registrar mermas
- Realizar corte de turno

No puede:

- Modificar precios
- Eliminar productos
- Ver ganancias netas

---

## 💰 Corte de Caja

El sistema opera mediante turnos.

Cada turno registra:

- Usuario asignado
- Hora de apertura
- Hora de cierre
- Fondo inicial

Al cerrar el turno se genera un **reporte de corte de caja** que incluye:

- Total de ventas
- Ventas en efectivo
- Ventas con tarjeta
- Número de tickets
- Cancelaciones
- Mermas registradas
- Diferencia entre efectivo esperado y contado

---

## 📊 Reportes Administrativos

El administrador puede consultar reportes como:

### Reporte Diario

- Total de ventas
- Ventas por método de pago
- Productos más vendidos
- Total de mermas
- Margen estimado

### Reporte Mensual

- Total acumulado
- Promedio diario
- Comparativa semanal
- Tendencia de productos
- Rotación de inventario

---

# 🧱 Tecnologías Utilizadas

| Tecnología | Uso |
|-------------|------|
| React | Interfaz de usuario |
| Vite | Entorno de desarrollo |
| Supabase | Base de datos PostgreSQL y autenticación |
| React Router | Navegación entre módulos |
| Recharts | Visualización de reportes |
| Lucide React | Iconografía |
| Date-fns | Manejo de fechas |

---

# ⚠️ Limitaciones del Sistema

- Requiere conexión a internet.
- No cuenta con modo offline.
- No incluye facturación electrónica del SAT.
- Diseñado para **una sola sucursal**.
- No está integrado con terminal bancaria.

---

- Karla Itzel Vazquez Cruz  
- Iker Saul Alonso Villela  
- Jesus Eduardo Galeana Leja
